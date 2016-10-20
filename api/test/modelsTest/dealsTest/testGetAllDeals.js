module.exports = function testGetAllDeals(done) {
    var chai = require('chai');
    var chaiHttp = require('chai-http');
    var server = require('../../../app');
    var should = chai.should();

    chai.use(chaiHttp);

    chai.request(server).get('/deal/all').end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
    });
};