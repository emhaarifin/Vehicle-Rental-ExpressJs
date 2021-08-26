/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const vehicle = require('./vehicle');
const category = require('./category');
const location = require('./location');
const users = require('./users');
const reservation = require('./reservation');

route.use('/vehicle', vehicle);
route.use('/category', category);
route.use('/location', location);
route.use('/auth', users);
route.use('/reservation', reservation);

module.exports = route;
