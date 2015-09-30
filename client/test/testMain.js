var assert = require("assert"),
    sinon = require("sinon");

describe('api', function(){
    var api = require('../src/js/api');

    describe('score', function(){
        
        it("should be saved", function () {
            api.save(function(err) {
                if (err) throw err;
                done();
              });
        });

        it("should be loaded", function () {
            api.load(function(err) {
                if (err) throw err;
                done();
              });
        });

        it("should load the best score", function () {
            api.best(function(err) {
                if (err) throw err;
                done();
              });
        });
    })


})
