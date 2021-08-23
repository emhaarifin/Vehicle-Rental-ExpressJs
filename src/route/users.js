/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const user = require('../controller/user');

const upload = require('../middleware/multer');

route
  .post('/login', user.login)
  .post('/register', user.register)
  .post('/refreshtoken', user.refreshToken)
  .put('/profile/update/:id', upload.single('image'), user.updateProfile)
  .get('/actived/:token', user.activactions)
  .get('/profile/:id', user.getUserByID);

module.exports = route;
