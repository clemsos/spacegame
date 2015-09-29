var game; 

// background :)
stars();
run();

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

            console.log(score);

            var loadedGame = SpaceGame.init("#prevSpace", settings);
            loadedGame.setScore(score);
        })
     });


// load the last game, returns the last score
function loadLastScore(callback) {
    d3.json("/last", function(err, json) {
        if (err) throw err;
        var score = json.score;
        callback(score);
    });
}

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
