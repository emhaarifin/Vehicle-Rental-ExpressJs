const vehicle = require('../models/vehicle');
const helper = require('../helper/response');
const mysql = require('mysql');

module.exports = {
  getVehicle: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'id';
    const sort = req.query.sort || 'ASC';
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    vehicle
      .getVehicleCount()
      .then((result) => {
        let total = result[0].TotalVehicle;
        const prevPage = page === 1 ? 1 : page - 1;
        const nextPage = page === total ? total : page + 1;
        console.log(limit, offset, search, 'tes juga');
        vehicle
          .getALlVehicle(search, sortBy, sort, offset, limit)
          .then((data) => {
            let pageDetail = {
              total: Math.ceil(total),
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
            helper.response(res, err.message, null, 404);
          });
      })
      .catch((err) => {
        helper.response(res, err.message, null, 404);
      });
  },
};
