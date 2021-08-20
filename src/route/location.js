/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const location = require('../controller/location');

route
  .get('/', location.getLocation)
  .post('/', location.addLocation)
  .put('/:id', location.updateLocation)
  .delete('/:id', location.deleteLocation);

module.exports = route;
