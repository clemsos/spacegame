#!/usr/bin/env python
# -*- coding: utf-8 -*-

import redis
r = redis.StrictRedis(host='localhost', port=6379, db=0)

# set defaults
if r.get("score") is None: 
    r.set("score", 0);

if r.get("best") is None: 
    r.set("best", 0);

# methods
def save_score(_score) :

    # write score in db 
    r.set("score",  _score)

    if _score > r.get("best"):
        r.set("best",  _score) # hall of fame 

    return _score

def load_last_score():
    return r.get("score")

def get_best():
    return r.get("best")
