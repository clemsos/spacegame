#!/usr/bin/env python
# -*- coding: utf-8 -*-

final_score = 0
best = 10

def load_last_score():
    return final_score

def save_score(_score) :
    # set global scope
    global final_score
    global best

    final_score = _score

    if _score > best:
        best = _score # hall of fame 
    return final_score

def get_best():
    return best
