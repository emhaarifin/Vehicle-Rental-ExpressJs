/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const vehicle = require('../controller/vehicle');
const upload = require('../middleware/multer');

route
  .get('/', vehicle.getVehicle)
  .post('/', upload.single('image'), vehicle.addVehicle)
  .get('/:id', vehicle.getVehicleById)
  .delete('/:id', vehicle.deleteVehicle);

module.exports = route;
