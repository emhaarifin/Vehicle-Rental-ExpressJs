/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const reservation = require('../controller/reservation');

route
  .get('/get/:userId', reservation.getReservation)
  .get('/:id', reservation.getReservationById)
  .post('/', reservation.addreservation)
  .put('/:id', reservation.finishReservation);

module.exports = route;
