#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
scores =[]

def load_last_score():
    if len(scores) : 
        return scores[-1]
    else : 
        return 0

def save_score(score) :
    print score
    scores.append(score)
    print scores
    return scores
