var game; 

// events
d3.select("#new-game")
    .on('click', function () { 
        game = SpaceGame.init("#space");
        game.start();
     });

d3.select("body")
    .on("keydown", function(i, e) { 
        d3.event.preventDefault();
        if(d3.event.keyCode == 32) {
            if(game.started) game.increaseScore();
        }
    });

