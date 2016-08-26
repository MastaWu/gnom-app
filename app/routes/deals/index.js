module.exports = function() {

    const deals = require('express').Router();
    const getAllDeals = require('./getAllDeals');

    deals.get('/', getAllDeals);

    return deals;
};
