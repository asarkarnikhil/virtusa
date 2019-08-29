const assert = require('chai').assert;
//const app = require('../app');
const keys = require('../config/keys');
const mongoose = require('mongoose');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('App', function () {

    it('it should get a jwt auth token', (done) => {
        chai.request(server)
            .get('/auth/login')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('token');
                done();
            });
    });
     it('it should create a new user db', (done) => {
         chai.request(server)
            .post('/user/createuser')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20ifSwiaWF0IjoxNTY2OTc5OTMwLCJleHAiOjE1NjY5Nzk5NjB9.CM9IZFkz0EVy92MVcIJdvhqmPYKZ8yK2IClBL8Yb9hM')
            .send({"firstname": "amol",
            "lastname": "bhuskute",
            "emailaddress": "test1@test.com",
            "username": "testasds"
            })
            .end((err, res) => {      
                should.not.exist(err);          
                res.should.have.status(200);                
                res.body.should.be.a('object');
                expect(res.body).to.have.property('message').equals('created new user');                
                expect(res.body).to.have.property('result');
                done();
            });
    });
    it('it should return duplicate user', (done) => {
        chai.request(server)
            .post('/user/createuser')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20ifSwiaWF0IjoxNTY2OTc5OTMwLCJleHAiOjE1NjY5Nzk5NjB9.CM9IZFkz0EVy92MVcIJdvhqmPYKZ8yK2IClBL8Yb9hM')
            .send({"firstname": "amol",
            "lastname": "bhuskute",
            "emailaddress": "test1@test.com",
            "username": "testasds"
            })
            .end((err, res) => {                
                should.not.exist(err);          
                res.should.have.status(200);                
                res.body.should.be.a('object');
                expect(res.body).to.have.property('message').equals('user with username');                
                done();
            });
    });
    it('it should get all the user from db', (done) => {
        chai.request(server)
            .get('/user/getuserlist')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20ifSwiaWF0IjoxNTY2OTc5OTMwLCJleHAiOjE1NjY5Nzk5NjB9.CM9IZFkz0EVy92MVcIJdvhqmPYKZ8yK2IClBL8Yb9hM')
            .end((err, res) => {                
                should.not.exist(err);          
                res.should.have.status(200);                
                res.body.should.be.a('object');
                expect(res.body).to.have.property('message');                
                expect(res.body).to.have.property('result').to.be.a('array');
                done();                
            });
    });

});