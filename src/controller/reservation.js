const reservation = require('../models/reservation');
const helper = require('../helper/response');
const { v4: uuidv4 } = require('uuid');
module.exports = {
  addreservation: (req, res) => {
    const { id, userId, vehicleId, qty, subTotal } = req.body;
    const data = {
      id: uuidv4(),
      userId,
      vehicleId,
      qty,
      subTotal,
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
        if (result[0]) {
          const products = result;
          const data = [];
          for (let i = 0; i < products.length; i++) {
            let product = products[i];
            const element = JSON.parse(products[i].image);
            product.image = element;
            data.push(product);
          }
          helper.response(res, 'Success get', data);
        } else {
          helper.response(res, 'Data Not Fount', null, 404);
        }
      })
      .catch((err) => {
        helper.response(res, err.message, null, 401);
      });
  },
  finishReservation: (req, res) => {
    const { id, userId, vehicleId, qty, subTotal } = req.body;
    const data = {
      id: uuidv4(),
      userId,
      vehicleId,
      qty,
      subTotal,
      status: 'pending',
    };
    reservation
      .addReservation(data)
      .then(() => {
        helper.response(res, 'Succes input data', data, 200);
      })
      .catch((err) => {
        helper.response(res, err.message, null, 401);
      });
  },
};
