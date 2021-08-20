/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const vehicle = require('./vehicle');
const category = require('./category');
const location = require('./location');

route.use('/vehicle', vehicle);
route.use('/category', category);

route.use('/location', location);

module.exports = route;
