/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const vehicle = require('./vehicle');

route.use('/vehicle', vehicle);

module.exports = route;
