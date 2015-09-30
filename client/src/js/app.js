// app.js

var d3 = require('d3');

var SpaceGame = require("./SpaceGame"); 
var stars = require("./stars");
var api = require("./api");
var modal = require("./modal");

// show background
stars.create();
stars.run();

// display best score
updateBestScore();

// init previous game
loadPreviousGame();

// events
d3.selectAll(".new-game")
    .on('click', function () {
        loadPreviousGame();
        startNewGame();
        modal.close() // in case it is already open
     });

d3.selectAll(".close-modal")
    .on('click', function () { 
        modal.close();
        loadPreviousGame();
    });

// save score and display modal
function saveScore() {
    api.save(12, function (score) {
        updateBestScore();
    })
}

// update best score
function updateBestScore() {
    api.best(function (score) {
        d3.select("#best").text(score)
    });
}

function loadPreviousGame() {
    api.load(function (score) {
        var settings = {
            timer : "PREVIOUS",
            score : score
        };

        var loadedGame = new SpaceGame(settings);
        loadedGame.init("#prevSpace");
        loadedGame.drawCircle(score, 300);
    })
}

function startNewGame() {
    d3.select(".gamer").remove(); // remove start btn

    // settings for the game
    var settings= {
        countDown : 10,
        finalCallback : function (score) { 
            api.save(score, function(score){
                modal.show("CONGRATS!", "YOUR SCORE : "+score, "PLAY AGAIN?");
                updateBestScore();
            }); 
        }
    };

    var game = new SpaceGame(settings);
    game.init("#space");
    game.start();

    // space bar will increase score
    d3.select("body")
        .on("keyup", function(i, e) {  // keyup to prevent continous press
            d3.event.preventDefault();
            if(d3.event.keyCode == 32) {
                if(game.started) game.increaseScore();
            }
        });
}

