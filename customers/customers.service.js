const db = require('_helpers/db');
const { Op } = require("sequelize");

module.exports = {
    getAll
};

async function getAll(req) {
    const limit = 10
    var whereClause;
    if (req.search && req.search != '') {
        whereClause = {username: {[Op.like]: '%'+req.search+'%'}};
    }
    let count = await await db.Customer.count({
        where: whereClause
    })
    let customers = await db.Customer.findAll({
        where: whereClause,
        order: [['id', 'DESC']],
        limit,
        offset: Number(req.page),
    }).then(result=>result).catch(error=>error);
    return {limit,count,customers};
}