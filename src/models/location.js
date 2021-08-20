/* eslint-disable no-undef */
const connection = require('../../src/confiq/db');

module.exports = {
  getAllLocation: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM location`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  addLocation: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO location set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateLocation: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE location SET ? WHERE id = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  deleteLocation: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM location WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
