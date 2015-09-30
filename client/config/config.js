var config = {},
    env = process.env.NODE_ENV || "development"; 

config.api = {
    spacegame : {
        url : "localhost",
        port : 5000,
        apiToken : ""
    }
};

// Custom to each env
switch(env){
  case 'production':
        config.api.spacegame.url = "139.162.4.177";
        config.api.spacegame.port = 5010;
  break;
  case 'test':
        config.api.spacegame.url = "localhost";
        config.api.spacegame.port = 5000;
  break;
  case 'development':
        config.api.spacegame.url = "localhost";
        config.api.spacegame.port = 5000;
}

module.exports = config;
