const connection = require('../../src/confiq/db');

module.exports = {
  addVehicle: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO vehicles set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  updateVehicle: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE vehicles SET ? WHERE id = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  getVehicleCount: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) as TotalVehicle FROM vehicles', (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  getALlVehicle: (searchVehicle, table, keyword, search, sortBy, sort, offset, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT vehicles.*, category.name_category as category, location.name_location as location FROM vehicles LEFT JOIN category ON vehicles.category_id = category.id LEFT JOIN location ON vehicles.location_id = location.id WHERE vehicles.name LIKE CONCAT('%',${searchVehicle},'%') AND ${table}.${keyword} LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`,
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
  getVehicleById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT vehicles.*, category.name_category as category, location.name_location as location FROM vehicles LEFT JOIN category ON vehicles.category_id = category.id LEFT JOIN location ON vehicles.location_id = location.id WHERE vehicles.id = ${id} `,
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
  deleteVehicle: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM vehicles WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};
