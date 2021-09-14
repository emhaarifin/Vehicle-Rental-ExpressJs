/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config();
const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');

const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
const route = require('./src/route/index');

const port = process.env.PORT;
const app = express();

const optionCors = {
  credentials: true,
  origin: true,
};

// app.use(cookieParser());

app.use(cors(optionCors));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.listen(port, () => {
  console.log('server on using port', port);
});

app.use('', route);
app.use('/file', express.static('./uploads'));
//  catch error and forward to error handler

app.use('*', (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error',
  });
});

module.exports = app;
