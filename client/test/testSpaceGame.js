var assert = require("assert"),
    sinon = require("sinon");

var SpaceGame = require('../src/js/SpaceGame');

describe('api', function(){

    var game;

    beforeEach(function() {
        var settings = {
            width : 500,
            height : 500,
            countDown : 3,
            finalCallback : function (score) { return score }
        };

        game = new SpaceGame(settings);
        game.init("body");

        this.clock = sinon.useFakeTimers(); // timer
    });

    afterEach(function() {
        d3.selectAll('svg').remove();
        this.clock.restore();
    });

     describe('the svg' ,function() {

        it('should be created', function() {
            assert.notEqual( game.svg ,  null );
            assert.equal( d3.selectAll('svg')[0].length , 1 );
        });

        it('should have the correct height', function() {
          assert.equal(game.svg.attr('width'), '500');
        });

        it('should have the correct width', function() {
          assert.equal(game.svg.attr('width'), '500');
        });

    });

     describe('the circle' ,function() {

        it('should be created', function() {
            assert.equal( d3.selectAll('circle')[0].length , 1 );
        });

        it('should have a zero radius', function() {
            assert.equal( d3.select('circle').attr("r") , 0 );
        });

        it('should be redraw', function() {
            game.drawCircle(1, 0);
            assert.equal( game.score , 1 );

            setTimeout(function() {
                assert.equal( d3.select('circle').attr("r") , 5 );
            }, 1000 );
        });

     });

     describe('the score' ,function() {
        
        it('should increase properly', function() {
            var score = game.score;
            game.increaseScore();
            assert.equal(game.score, score+1);
        });

        it('should modify circle radius', function() {
            var circle = game.svg.select("circle");
            var r = parseInt( circle.attr("r") );
            game.increaseScore();

            setTimeout(function() { // wait for SVG transitions to be done
                var r2 = parseInt( circle.attr("r") );
                assert.equal(r2, r+5);
            }, 1000 );

        });

     })

     describe('the caption' ,function() {

        it('should be created', function() {
            assert.equal( d3.selectAll('.caption')[0].length , 1 );
        });

         describe('the timer' ,function() {
            it('should be created', function() {
                assert.equal( d3.selectAll('text.timer')[0].length , 1 );
            });
         })
    })

});
