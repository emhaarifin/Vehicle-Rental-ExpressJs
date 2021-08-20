/* eslint-disable no-undef */
const connection = require('../../src/confiq/db');

module.exports = {
  getAllCategory: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM category`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  addCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO category set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateCategory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE category SET ? WHERE id = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM category WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
