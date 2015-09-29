#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from flask import Flask

# assets dir
basedir = os.path.dirname(os.path.realpath(__file__))
ASSETS_DIR = os.path.join(os.path.dirname(basedir), "client")

# init app
app = Flask(__name__)

# config
app.secret_key = "a_random_secret_key_$%#!@"
app._static_folder = ASSETS_DIR

import server.routes
