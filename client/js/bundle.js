var game; 

// background :)
stars();
run();

updateBestScore();

// events
d3.select("#new-game")
    .on('click', function () {
        
        var settings= {
            countDown : 5,
            finalCallback : function (score) { 
                saveScore(score, function(score){
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
        loadLastScore(function (score) {

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
        saveScore(12, function (score) {
            console.log(score);
            updateBestScore();
        })
    })

// load the last game, returns the last score
function loadLastScore(callback) {
    d3.json("/last", function(err, json) {
        if (err) throw err;
        var score = json.score;
        callback(score);
    });
}

// save score
function saveScore (score, callback) {
    console.log(score);
    d3.xhr("/save")
       .header("Content-Type", "application/json")
       .post( 
             JSON.stringify({ 'score': score }), 
             function(err, data) {
                    if(err) throw err;
                    var resp = JSON.parse(data.response);
                    callback(resp);
            }
        );
}

// load the best score
function loadBestScore(callback) {
    d3.json("/best", function(err, json) {
        if (err) throw err;
        var score = json.score;
        callback(score);
    });
}

// best visual update
function updateBestScore() {
    loadBestScore(function (score) {
        d3.select("#best").text(score)
    });
}
