SpaceGame = {
    started : false,
    timer : "Ready",
    score : 0,
    countDown : 10,
    divName : "game",
    svg : null,
    init : function(divName) {
        console.log("init new game ! ");
        d3.selectAll(divName+' svg').remove(); // clean
        this.initSVG(divName);
        this.divName = divName;
        return this; 
    },
    initSVG : function(divName) {
        var w = 500,
            h = 500;

        // draw SVG 
        this.svg = d3.select(divName)
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // draw circle
        var circle = this.svg.append("circle")
            .attr("cx", w/2)
            .attr("cy", h/2)
            .style("fill", "steelblue")
            .attr("r", 0);

        // draw captions
        var caption  = this.svg.append("g")
            .attr("class", "caption")
            .attr("transform", "translate(10,10)")

        this.scoreCaption = caption.append("text")
            .attr("class", "score")
            .text(this.score)
            .attr("x", 10)
            .attr("y", 10)

        this.timerCaption = caption.append("text")
            .attr("class", "timer")
            .text(this.timer)
            .attr("x", 60)
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
                self.timerCaption.text('Game finished');
        })
    },

    increaseScore : function () {
        this.score++;
        d3.select(this.divName)
            .select("circle")
            .attr("r", this.score*5);
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
