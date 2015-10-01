# spacegame

A game from outer space


## Config

Basic config is available in ```config.json``` file.

* chose database : ```null``` or ```redis``` 
* ```secret``` : salt / key for Flask 


## Dependencies

**Python server**

    virtualenv venv
    . venv/bin/activate
    pip install -r requirements.txt

to use redis, run ```pip install-redis```

**JS client**

    cd client
    npm install
    npm run build

## Dev

**Run the Python server**

    . venv/bin/activate
    python run.py

**Compile the JS/CSS client app** (will watch all changes in JS and CSS)

    npm start


## Test

**Test server**

    pip install -r dev_requirements.txt
    py.test tests

**Test client** 

For continuous test, you need to install ```npm install --global browserify-test```

    browserify-test --watch
    # navigate to http://localhost:7357


## Deployment

Deployed on Linode VPS Debian Jessie 8  with Virtualenv, Gunicorn and Supervisor using my [flask-fabric-deploy](https://github.com/clemsos/flask-fabric-deploy) scripts. (Slightly modified to ignore nginx conf)

    git clone git@github.com:clemsos/flask-fabric-deploy.git
    pip install -r requirements.txt
    cp config/servers.py.sample config/servers.py
    # edit the config/servers.py
    fab prod setup_debian
    fab prod setup_project
    fab prod deploy

## Credits

* Font from http://www.04.jp.org
* Thx to Rhizi for the mission & Le Club for the music

## TODO

* server : replace SpaceGame```new``` with ```Object.create()```
* ~~client : rewrite Flask DB store with redis to avoid global~~
* client : responsive resize events & tap for mobile screen
