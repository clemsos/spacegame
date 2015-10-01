#!/usr/bin/env python
# -*- coding: utf-8 -*-

import unittest
from server import config
from server.db_redis import load_last_score, save_score, get_best, set_defaults,r

class TestRedisServerDb(unittest.TestCase):

    def setUp(self):
        r.flushdb()
        set_defaults()

    def test_save_score(self):
        """Score should be saved properly"""
        save_score(11)
        score = load_last_score()
        self.assertTrue(score == 11)

    def test_load_last_score(self): 
        """ Latest score should be loaded """
        save_score(11)
        score = load_last_score()
        self.assertTrue(score == 11)
        save_score(4)
        score = load_last_score()
        self.assertTrue(score == 4)

    def test_get_best(self):
        """ Best score should be kept """
        save_score(11)
        best = get_best()
        self.assertTrue(best ==11)
        save_score(15)
        best = get_best()
        self.assertTrue(best ==15)
        save_score(2)
        best = get_best()
        self.assertTrue(best ==15)
