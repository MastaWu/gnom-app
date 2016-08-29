// var getAllDeals = require('./dealsTest/testGetAllDeals');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Models', function() {
    it("Test: should list all Deals on /deal/all GET", function(done) {
        chai.request(server)
            .get('/api/deal/all')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it("Test: should list a single Deal on /deal/1 GET", function(done) {
        chai.request(server)
            .get('/api/deal/1')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it("Test: should list all Restaurants on /restaurant/all GET", function(done) {
        chai.request(server)
            .get('/api/restaurant/all')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it("Test: should list a single Restaurant on /restaurant/1 GET", function(done) {
        chai.request(server)
            .get('/api/restaurant/1')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});