const reservation = require('../models/reservation');
const helper = require('../helper/response');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
moment.locale('id');
module.exports = {
  addreservation: (req, res) => {
    const { userId, vehicleId, qty, subTotal } = req.body;
    const exp = new Date(1);
    const data = {
      id: uuidv4(),
      userId,
      vehicleId,
      qty,
      subTotal,
      expDate: exp,
      status: 'pending',
    };
    reservation
      .addReservation(data)
      .then(() => {
        reservation
          .getResult(data.id)
          .then((result) => {
            helper.response(res, 'Succes input data', result, 200);
          })
          .catch((error) => {
            helper.response(res, err.message, null, 401);
          });
      })
      .catch((err) => {
        helper.response(res, err.message, null, 401);
      });
  },
  getReservation: (req, res) => {
    const userId = req.params.userId;
    reservation
      .getReservation(userId)
      .then((result) => {
        const payload = result.map((item) => {
          return {
            ...item,
            image: JSON.parse(item.image),
            startDate: moment(item.startDate).format('LLLL'),
            expDate: moment(item.expDate).format('LLLL'),
            createdAt: moment(item.createdAt).format('LLLL'),
            updatedAt: moment(item.updatedAt).format('LLLL'),
          };
        });
        result.length
          ? helper.response(res, 'Sukses', payload, 200)
          : helper.response(res, 'Belum ada reservation', payload, 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 401);
      });
  },
  finishReservation: (req, res) => {
    const id = req.params.id;
    const data = {
      method: req.body.method,
      status: 'pay',
    };
    reservation
      .payReservation(id, data)
      .then(({ affectedRows }) => {
        affectedRows
          ? helper.response(res, 'Succes input data', data, 200)
          : helper.response(res, 'Tidak ada perubahn data', data, 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 401);
      });
  },
  getReservationById: (req, res) => {
    const id = req.params.id;
    reservation
      .getReservationById(id)
      .then((result) => {
        const payload = result.map((item) => {
          return {
            ...item,
            image: JSON.parse(item.image),
            startDate: moment(item.startDate).format('LLLL'),
            expDate: moment(item.expDate).format('LLLL'),
            createdAt: moment(item.createdAt).format('LLLL'),
            updatedAt: moment(item.updatedAt).format('LLLL'),
          };
        });
        helper.response(res, 'Succes get data', payload, 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 401);
      });
  },
};
