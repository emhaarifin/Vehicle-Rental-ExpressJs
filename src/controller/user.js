/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const users = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const helper = require('../helper/response');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    const { fullname, email, password, roles } = req.body;
    const user = await users.findUser(email);

    if (user.length > 0) {
      return helper.response(res, 'email sudah ada', null, 401);
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          id: uuidv4(),
          fullname: fullname,
          email: email,
          roles: 'member',
          password: hash,
          status: 'inactive',
        };
        if (roles === 'admin') {
          data.roles = 'admin';
        } else {
          data.roles = 'member';
        }

        users
          .register(data)
          .then(() => {
            jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, res) => {
              if (err) {
                res.send('failed');
              } else {
                let transporter = nodemailer.createTransport({
                  service: 'gmail', // use SSL
                  auth: {
                    user: 'blanja.check@gmail.com', // username for your mail server
                    pass: 'anymxizeuxchgdri', // password
                  },
                });
                let activeEmail = `<div>
                  <p>Hi, ${data.fullname}<p>
                  <p>Thankyou for creating a Vehicle-Rental Account. For your security, please verify your account.</p>
                  <a href="http://localhost:4000/auth/actived/${res}">click</a>
                  </div>`;
                transporter.sendMail({
                  from: `Blanja`, // sender address
                  to: data.email, // list of receivers
                  subject: 'Activation email', // Subject line
                  html: activeEmail, // html body
                });
              }
            });
            delete data.password;
            helper.response(res, 'Register Success and need activation', data, 200);
          })
          .catch((err) => {
            helper.response(res, err.message, null, 500);
          });
      });
    });
  },
  login: async (req, res, next) => {
    const checkUser = await users.findUser(req.body.email);
    if (checkUser.length > 0) {
      const checkPassword = bcrypt.compare(req.body.password, checkUser[0].password);
      if (checkPassword) {
        const { id, name, roles, avatar } = checkUser[0];
        const payload = {
          id,
          name,
          roles,
          avatar,
          ...checkUser[0],
        };
        delete payload.email;
        delete payload.password;
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          },
          function (err, token) {
            res.cookie('token', token, {
              httpOnly: true,
              maxAge: 60 * 60 * 60 * 24,
              secure: true,
              path: '/',
              sameSite: 'none',
            });
            res.cookie('avatar', payload.avatar, {
              httpOnly: true,
              maxAge: 60 * 60 * 60 * 24,
              secure: true,
              path: '/',
              sameSite: 'none',
            });
            res.cookie('roles', payload.roles, {
              httpOnly: true,
              maxAge: 60 * 60 * 60 * 24,
              secure: true,
              path: '/',
              sameSite: 'none',
            });
            res.cookie('id', payload.id, {
              httpOnly: true,
              maxAge: 60 * 60 * 60 * 24,
              secure: true,
              path: '/',
              sameSite: 'none',
            });
            helper.response(res, 'Login success', payload, 200);
          }
        );
      } else {
        helper.response(res, 'Password wrong', null, 401);
      }
    } else {
      helper.response(res, 'Email not found', null, 401);
    }
  },
  refreshToken: (req, res) => {
    const token = req.body.refreshToken;
    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
      const payload = {};
      delete payload.password;
      const refresh = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      delete payload.password;
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: '24h',
      });
      payload.token = refresh;
      payload.refreshToken = refreshToken;
      helper.response(res, 'New Refresh Token', payload);
    });
  },
  getUserByID: (req, res) => {
    const id = req.params.id;
    users
      .getUserById(id)
      .then((result) => {
        helper.response(res, 'ok', result);
      })
      .catch((err) => {
        helper.response(res, 'Not Found', null, 404);
      });
  },
  updateProfile: async (req, res) => {
    const id = req.params.id;
    const data = {
      phone_number: req.body.phone_number,
      adress: req.body.adress,
    };

    if (req.body.gender) {
      data.gender = req.body.gender;
    }
    if (req.file) {
      data.avatar = `${process.env.BASE_URL}/file/${req.file.filename}`;
    }
    users
      .updateUser(id, data)
      .then(() => {
        helper.response(res, 'Succes Update Profile', 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 401);
      });
  },
  activactions: (req, res) => {
    const token = req.params.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        helper.response(res, 'Activation Failed', null, 401);
      } else {
        const email = decode.email;
        users
          .activation(email)
          .then(() => {
            res.redirect(`${process.env.URL_FRONT_END}/activation`);
            // helper.response(res, 'Activation Succes');
          })
          .catch((error) => {
            res.redirect(`${process.env.URL_FRONT_END}/activation`);
            // helper.response(res, error.message);
          });
      }
    });
  },
  logout: (req, res) => {
    res.clearCookie('token');
    res.clearCookie('avatar');
    res.clearCookie('id');
    res.clearCookie('roles');
    helper.response(res, 'Success Logout', null, 200);
  },
};
