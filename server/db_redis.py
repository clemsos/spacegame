#!/usr/bin/env python
# -*- coding: utf-8 -*-

import redis
from server import config

r = redis.StrictRedis(host=config["redis"]["host"], port=config["redis"]["port"], db=config["redis"]["db"])

# set defaults
def set_defaults():
    r.set("score", 0); 
    r.set("best", config["default_best"]);

if r.get("score") is None or r.get("best") is None :
    set_defaults()

# methods
def save_score(_score) :

    # write score in db 
    r.set("score",  _score)

    if _score > int(r.get("best")):
        r.set("best",  _score) # hall of fame 

    return _score

def load_last_score():
    return int(r.get("score"))

def get_best():
    return int(r.get("best"))
