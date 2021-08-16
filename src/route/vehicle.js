/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const vehicle = require('../controller/vehicle');

route.get('/', vehicle.getVehicle);

module.exports = route;
