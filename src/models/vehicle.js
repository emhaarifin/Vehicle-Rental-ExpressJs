const { off } = require('../../src/confiq/db');
const connection = require('../../src/confiq/db');

module.exports = {
  getVehicleCount: () => {
    return new Promise((resolve) => {
      connection.query('SELECT COUNT(*) as TotalVehicle FROM vehicles', (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },

  getALlVehicle: (search, sortBy, sort, offset, limit) => {
    return new Promise((resolve, reject) => {
      console.log(limit, offset, 'model');
      connection.query(
        `SELECT vehicles.*, category.name_category, location.name_location FROM vehicles LEFT JOIN category ON vehicles.category_id = category.id LEFT JOIN location ON vehicles.location_id = location.id WHERE vehicles.name LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`,
        [search, offset, limit],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
