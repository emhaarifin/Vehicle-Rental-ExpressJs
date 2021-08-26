/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const reservation = require('../controller/reservation');

route.get('/get/:userId', reservation.getReservation);
route.post('/', reservation.addreservation);

module.exports = route;
