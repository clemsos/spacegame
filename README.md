# spacegame

A game from outer space

## Run

    python run.py

#### Dependencies

**Python server **

    virtualenv venv
    . venv/bin/activate
    pip install -r requirements.txt

**JS client **

    cd client
    npm install
    npm run build

## Dev

**Run the Python server**

    . venv/bin/activate
    python run.py

**Compile the JS/CSS client app** (will watch all changes in JS and CSS)

    npm start

NB : to watch continuous test, you can use ```browserify-test --watch```  and  navigate to http://localhost:7357. You may need to install ```npm install --global browserify-test```

## Test

**Test server**

    pip install -r dev_requirements.txt
    py.test tests

**Test client** 

    npm run test

## Deployment

Deployed on Linode VPS Debian 6.1 with Virtualenv, Gunicorn and Supervisor using my [flask-fabric-deploy](https://github.com/clemsos/flask-fabric-deploy) scripts. (Slightly modified to ignore nginx conf)

    git clone git@github.com:clemsos/flask-fabric-deploy.git
    pip install -r requirements.txt
    cp config/servers.py.sample config/servers.py
    # edit the config/servers.py
    fab prod setup_debian
    fab prod setup_project
    fab prod deploy

## Credits

* Font from http://www.04.jp.org/
* Music from
* Thx to Le CLub
