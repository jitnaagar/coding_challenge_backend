const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();


async function initialize() {
    // create db if it doesn't already exist
    const host  = process.env.DB_HOST ? process.env.DB_HOST : config.db.host;
    const port  = process.env.DB_PORT ? process.env.DB_PORT : config.db.port;
    const user  = process.env.DB_USER ? process.env.DB_USER : config.db.user;
    const password  = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : config.db.password;
    const database  = process.env.DB_DATABASE ? process.env.DB_DATABASE : config.db.database;

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Customer = require('../customers/customers.model')(sequelize);

    // sync all models with database
    await sequelize.sync({ alter: true });
}