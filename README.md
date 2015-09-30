# spacegame

A game from outer space

## Run

    python run.py

#### Dependencies

    virtualenv venv
    . venv/bin/activate
    pip install -r requirements.txt

## Test

    pip install -r dev_requirements.txt
    py.test tests

## Deploy

You can deploy using my [flask-fabric-deploy](https://github.com/clemsos/flask-fabric-deploy) scripts.

    git clone git@github.com:clemsos/flask-fabric-deploy.git
    # edit the config/servers.py
    fab prod setup 
    fab prod deploy



## Credits

* Font from http://www.04.jp.org/
* Music from
* Thx to Le CLub
