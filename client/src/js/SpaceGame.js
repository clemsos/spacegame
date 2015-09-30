/*
* SpaceGame
* create a small SVG game 
* 
*/
var d3 = require('d3');

function SpaceGame (settings) {
    if(!settings) settings = {};

    // init values
    this.timer = settings.timer || "READY";
    this.countDown = settings.countDown || 10;
    this.score = settings.score || 0;
    this.divName = settings.divName || "game";
    this.finalCallback = settings.finalCallback || function(score){ alert(score); };  
}

SpaceGame.prototype = {
    init : function(divName) {
        d3.selectAll(divName+' svg').remove(); // clean
        this.divName = divName;
        this.initSVG(divName);
        return this; 
    },
    initSVG : function(divName) {
        var w = window.innerWidth/2,
            h = window.innerHeight/2 +200;

        // draw SVG 
        this.svg = d3.select(divName)
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // draw circle
        var circle = this.svg.append("circle")
            .attr("cx", w/2)
            .attr("cy", h/2)
            .style("stroke", "steelblue")
            .style("fill", "none")
            .style("opacity", ".8")
            .attr("r", 0);

        // draw captions
        var caption  = this.svg.append("g")
            .attr("class", "caption")
            .attr("transform", "translate(10,10)")

        this.scoreCaption = caption.append("text")
            .attr("class", "score")
            .text(this.score)
            .style("fill", "green")
            .attr("x", 10)
            .attr("y", 10)

        this.timerCaption = caption.append("text")
            .attr("class", "timer")
            .text(this.timer)
            .style("fill", "red")
            .style('text-anchor', "end")
            .attr("x", w -50)
            .attr("y", 10);
    },

    start : function() {
        var self = this;
        self.started = true;
        var start = new Date().getTime();

        // start game
        self._gameTimer(start,  
              function(time){

                // show time 
                self.timerCaption.text(time);

                // show score
                self.scoreCaption.text(self.score);
              },
              function(){
                self.started = false; // end game
                self.timerCaption.text('FINISHED!');
                self.finalCallback(self.score);
        })
    },

    drawCircle : function(score, duration) {
        this.score= score;
        d3.select(this.divName)
            .select("circle")
            .transition()
            .duration(duration)
            .attr("stroke-width", 5)
            .attr("r", score*5+50)
            .transition()
            .duration(duration)
            .attr("stroke-width", 20)
            .attr("r", score*5)
            .ease('bounce');
    },

    increaseScore : function () {
        this.score++;
        this.drawCircle(this.score, 150);
    },

    _gameTimer : function(start, execute, callback) {

        var self = this; // fix scope

        // private function for the setInterval
        function timer() {
            var now = new Date().getTime();
            var diff = now - start;
            var seconds = self.countDown - Math.floor(diff / 1000);
            execute(seconds);
            self.timer = seconds;

            if (!seconds) {
                window.clearInterval(self.counter);
                callback();
            }
        }
        timer();
        self.counter = setInterval(timer, 1000);
    }
}

module.exports = SpaceGame
