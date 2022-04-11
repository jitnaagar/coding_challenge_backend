const express = require('express');
const router = express.Router();
const customerService = require('./customers.service');

// routes
router.get('/', getAll);

module.exports = router;

// route functions
function getAll(req, res, next) {
    customerService.getAll(req.query)
        .then(customers => res.json(customers))
        .catch(next);
}

