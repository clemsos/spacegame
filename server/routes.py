#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from server import app, basedir
from server.db import save_score, load_last_score
from flask import render_template, request, url_for, make_response, jsonify

@app.route("/")
def home():
    return make_response(open(os.path.join(basedir, '../client/index.html')).read())

@app.route("/last/",  methods=['GET'])
def api_get():
    score = load_last_score()
    return jsonify( {"score" : str(score)} )

@app.route("/save",  methods=['GET', 'POST'])
def api_save():
    req_json = request.get_json()
    score = req_json["score"]
    save_score(score)
    return jsonify( {"score" : str(load_last_score()) } )

# STATIC
@app.route('/js/<path:path>')
def js_static_proxy(path):
    return app.send_static_file(os.path.join('js', path))

@app.route('/css/<path:path>')
def css_static_proxy(path):
    return app.send_static_file(os.path.join('css', path))

@app.route('/fonts/<path:path>')
def fonts_static_proxy(path):
    print path
    return app.send_static_file(os.path.join('fonts', path))

