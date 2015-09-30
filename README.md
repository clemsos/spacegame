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

## Deployment

Deployed on Linode VPS Debian 6.1 with Gunicorn and Supervisor using my [flask-fabric-deploy](https://github.com/clemsos/flask-fabric-deploy) scripts. (Slightly modified to ignore nginx conf)

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
