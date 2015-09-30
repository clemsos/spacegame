/*
* API communication with the server
*
*/

var config = require( '../../config/config');
var request = require('browser-request');
var apiURL = "http://"+ config.api.spacegame.url + ":" +config.api.spacegame.port;

// load the last game, returns the last score
function loadLastScore(callback) {

    var url = apiURL+"/last"

    request(url, function(err, response, body) {
        if (err) throw err;
        var res = JSON.parse(body);
        callback(res.score);
    });
}

// save score
function saveScore (score, callback) {

    // URL
    var url = apiURL+"/save"

    request({
        url: url,
        method: "POST",
        json: { 'score': score }
    }, function(err, response, body) {
            if(err) throw err;
            callback(body.score);
    });

}

// load the best score
function loadBestScore(callback) {
    
    var url = apiURL+"/best"

    request(url, function(err, response, body) {
        if (err) throw err;
        var res = JSON.parse(body);
        callback(res.score);
    });
}

module.exports = {
    load : loadLastScore,
    save : saveScore,
    best : loadBestScore
}
