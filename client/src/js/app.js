// app.js

var d3 = require('d3');

var SpaceGame = require("./SpaceGame"); 
var stars = require("./stars");
var api = require("./api");

// star background
stars.create();
stars.run();

updateBestScore();

// events
d3.select("#new-game")
    .on('click', function () {
        
        var settings= {
            countDown : 5,
            finalCallback : function (score) { 
                api.save(score, function(score){
                    console.log(score);
                }); 
            }
        };

        game = SpaceGame.init("#space", settings);
        game.start();
     });

d3.select("body")
    .on("keyup", function(i, e) {  // keyup to prevent continous press
        d3.event.preventDefault();
        if(d3.event.keyCode == 32) {
            if(game.started) game.increaseScore();
        }
    });

// load a game
d3.select("#get-game")
    .on('click', function () { 
        api.load(function (score) {

            var settings = {
                timer : "PREVIOUS",
                score : score
            };

            var loadedGame = SpaceGame.init("#prevSpace", settings);
            loadedGame.drawCircle(score, 300);
            updateBestScore();
        })
     });

d3.select("#save-game")
    .on('click', function () { 
        api.save(12, function (score) {
            console.log(score);
            updateBestScore();
        })
    })



// best visual update
function updateBestScore() {
    api.load(function (score) {
        d3.select("#best").text(score)
    });
}
