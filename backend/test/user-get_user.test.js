/*
* Testing the user get-user route
* */

/* Importing assertion libraries and request to make API calls */
import {expect} from 'chai';
import assert from 'assert';
import request from 'request';

/* Testing both the status code and that no error response is received */
describe('updateLab route: status and content', function() {
    describe ('status', function() {
        /* This function tests whether a status of 200 is received back */
        it('status', function(done){
            request('http://localhost:8000/get-user',
                function(error, response) {
                    assert(response.statusCode, 200);
                    done();
                });
        });
        /* This function tests that there isn't a error returned from the call */
        it('content', function(done) {
            request('http://localhost:8000/get-user',
                function(error, response, body) {
                    expect(response).to.not.equal(null);
                    done();
                });
        });
    });
});

assert (5 < 7);