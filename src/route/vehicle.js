/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const vehicle = require('../controller/vehicle');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');

route
  .get('/', vehicle.getVehicle)
  .get('/:id', vehicle.getVehicleById)
  .post('/', upload.array('image', 3), vehicle.addVehicle)
  .put('/:id', upload.array('image', 3), vehicle.updateVehicle)
  .delete('/:id', vehicle.deleteVehicle);

module.exports = route;
