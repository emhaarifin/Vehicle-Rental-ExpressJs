const vehicle = require('../models/vehicle');
const helper = require('../helper/response');
const mysql = require('mysql');

const path = require('path');
const fs = require('fs');
const dirPath = path.join(__dirname, '../../uploads');
module.exports = {
  getVehicle: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || 'id';
    const sort = req.query.sort || 'ASC';
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    // handle search
    let searchVehicle = JSON.stringify(req.query.searchVehicle || '');
    let search = req.query.search || '';
    let keyword = req.query.keyword;
    let table = req.query.table;

    switch (table) {
      case 'location':
        table = 'location';
        keyword = 'name_location';
        break;
      case 'date':
        table = 'vehicles';
        keyword = 'status = ' + JSON.stringify('Available');
        break;
      default:
        keyword = 'name';
        table = 'vehicles';
        break;
    }

    vehicle
      .getVehicleCount()
      .then((result) => {
        let total = result[0].TotalVehicle;
        const prevPage = page === 1 ? 1 : page - 1;
        const nextPage = page === total ? total : page + 1;
        console.log(limit, offset, search, 'tes juga');
        vehicle
          .getALlVehicle(searchVehicle, table, keyword, search, sortBy, sort, offset, limit)
          .then((data) => {
            let pageDetail = {
              all_data: Math.ceil(total),
              data_found: Math.ceil(data.length),
              per_page: limit,
              current_page: page,
              totalPage: Math.ceil(total / limit),
              nextLink: `http://localhost:4000${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
              prevLink: `http://localhost:4000${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
            };
            if (data[0] !== undefined) {
              helper.responsePagination(res, 'OK', 200, false, pageDetail, data);
            } else {
              helper.responsePagination(res, 'Data Not Found', 404, true, pageDetail, data);
            }
          })
          .catch((err) => {
            console.log(err);
            helper.response(res, err.message, null, 404);
          });
      })
      .catch((err) => {
        console.log(err);
        helper.response(res, err.message, null, 404);
      });
  },
  getVehicleById: (req, res) => {
    const id = req.params.id;
    vehicle
      .getVehicleById(Number(id))
      .then((result) => {
        console.log(result, 'by id');
        if (result[0]) {
          helper.response(res, 'Success get detail vehicle', result);
        } else {
          helper.response(res, 'Vehicle not found', null, 404);
        }
      })
      .catch((err) => {
        helper.response(res, err.message, null, 404);
      });
  },

  addVehicle: (req, res) => {
    const data = {
      location_id: req.body.location_id,
      category_id: req.body.category_id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      status: req.body.status,
      image: `${process.env.BASE_URL}/file/${req.file.filename}`,
      stock: req.body.stock,
    };
    vehicle
      .addVehicle(data)
      .then(() => {
        helper.response(res, 'Succes input data', data, 200);
      })
      .catch((err) => {
        fs.unlink(`${dirPath}/${req.file.filename}`, (err) => {
          if (err) {
            console.log('Error unlink image product!' + err);
          }
        });
        const { location_id, category_id, name, description, price, status, image, stock } = data;
        if (!location_id) return helper.response(res, "Location can't be null!", null, 400);
        if (!category_id) return helper.response(res, "Category can't be null!", null, 400);
        if (!name) return helper.response(res, "Name can't be null!", null, 400);
        if (!description) return helper.response(res, "Description can't be null!", null, 400);
        if (!price) return helper.response(res, "Price can't be null!", null, 400);
        if (!status) return helper.response(res, "Status can't be null!", null, 400);
        if (!image) return helper.response(res, "Image can't be null!", null, 400);
        if (!stock) return helper.response(res, "Stock can't be null!", null, 400);
      });
  },
  deleteVehicle: (req, res) => {
    const id = req.params.id;
    vehicle
      .deleteVehicle(Number(id))
      .then((result) => {
        if (result.affectedRows) {
          helper.response(res, 'Success delete product');
        } else {
          helper.response(res, 'Nothing Deleted');
        }
      })
      .catch((err) => {
        helper.response(res, 404, err);
      });
  },
};
