/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const category = require('../controller/category');

route
  .get('/', category.getCategory)
  .post('/', category.addCategory)
  .put('/:id', category.updateCategory)
  .delete('/:id', category.deleteCategory);

module.exports = route;
