/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const helper = require('../helper/response');

module.exports = {
  verifyAccess: (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error('server need token');
      error.code = 401;
      return next(error);
    }
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          const error = new Error('token expired');
          error.status = 401;
          return next(error);
        } else if (err.name === 'JsonWebTokenError') {
          const error = new Error('token invalid');
          error.status = 401;
          return next(error);
        } else {
          const error = new Error('token not active');
          error.status = 401;
          return next(error);
        }
      }
      req.id = decoded.id;
      req.status = decoded.status;
      req.roles = decoded.roles;
      next();
    });
  },
  authenticateToken: (req, res, next) => {
    const { userId, token } = req;

    client.get(userId, (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      if (data) {
        const parseData = JSON.parse(data);
        if (parseData[userId].includes(token)) {
          res.status(500).send({
            message: 'You have to login',
          });
        }
      }

      return next();
    });
  },
  custommer: (req, res, next) => {
    const roles = req.roles;
    if (roles === 'custommer') {
      return next();
    }
    return helper.response(res, 'Forbidden Access', 403);
  },
  seller: (req, res, next) => {
    const status = req.status;
    const roles = req.roles;
    if (status !== 'active') {
      return helper.response(res, 'Need Activasi Email', 403);
    }
    if ((roles === 'seller') & (status === 'active')) {
      return next();
    }
    return helper.response(res, 'Forbidden Access', 403);
  },
};
