const request = require('supertest');
const {app, server, io} = require('../socketversion.js');

describe('Testing /ping API', () => {
    it('should respond with an example message', (done) => {
        request(app)
        .get('/ping')
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }
                try {
                    if (!res.text.includes('example')) {
                        throw new Error('/ping does not contain an example message.');
                    }
                    done();
                } catch (error) {
                    done(error);
                }
        });
    });
});

describe('Testing /ping/{timestamp} API', () => {
    it('should respond with a number', (done) => {
        request(app)
        .get('/ping/' + Date.now())
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }
                try {
                    console.log("Ping API response: " + res.text + " ms")
                    if (isNaN(parseInt(res.text))) {
                        throw new Error('/ping/{timestamp} does not return a number.');
                    }
                    done();
                } catch (error) {
                    done(error);
                }
        });
    });
});

afterAll((done) => {
    server.close(done);
    io.close();
});