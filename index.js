/**
 * Created by Andres Monroy (HyveMynd) on 12/3/14.
 */
var express = require('express');

var App = require('./config/express')(express);
require('./config/passport')(App);
require('./config/routes')(App, express);

module.exports = App;