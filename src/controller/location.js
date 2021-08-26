/* eslint-disable no-undef */
const location = require('../models/location');
const helper = require('../helper/response');

module.exports = {
  getLocation: (req, res) => {
    location
      .getAllLocation()
      .then((result) => {
        helper.response(res, 'OK', result);
      })
      .catch((err) => {
        helper.response(res, null, 404, 'Data Not Found');
      });
  },
  addLocation: (req, res) => {
    const data = {
      categoryName: req.body.categoryName,
      image: req.body.image,
      createdAt: new Date(),
    };
    location
      .addLocation(data)
      .then(() => {
        helper.response(res, 'Succes input category', data, 200);
      })
      .catch((error) => {
        helper.response(res, 'Error input category', null, 410);
      });
  },
  updateLocation: (req, res) => {
    const id = req.params.id;
    const data = {
      categoryName: req.body.categoryName,
      modifiedAt: new Date(),
    };
    location
      .updateLocation(Number(id), data)
      .then((res) => {
        helper.response(res, 'Success update category');
      })
      .catch((err) => {
        helper.response(res, null, 404, err);
      });
  },
  deleteLocation: (req, res) => {
    const id = req.params.id;
    location
      .deleteLocation(Number(id))
      .then((res) => {
        helper.response(res, 'Success delete category');
      })
      .catch((err) => {
        helper.response(res, null, 404, 'Id cateogry for delete No found');
      });
  },
};
