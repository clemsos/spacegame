#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
from flask import Flask
from flask.ext.cors import CORS

# assets dir
basedir = os.path.dirname(os.path.realpath(__file__))
ASSETS_DIR = os.path.join(os.path.dirname(basedir), "client")

# config file
try :
    if os.environ['SPACEGAME_ENV'] == "test"  :
        config_path = os.path.join(os.path.dirname(basedir),os.path.join("tests","config.json"))
except KeyError: # spacegame env_path does not exist
    config_path = os.path.join(os.path.dirname(basedir),"config.json")

with open(config_path) as config_file:
    config = json.load(config_file)

# init app
app = Flask(__name__)
CORS(app) # needed for automated testing

# config
app._static_folder = ASSETS_DIR
app.secret_key = config["secret"]

import server.routes
