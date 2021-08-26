const connection = require('../confiq/db');

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO users set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  addStore: (store) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO stores set ?`, store, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  findUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE email = ?`, email, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  findStore: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM stores WHERE user_id = ?`, email, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  getStoreData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM stores WHERE user_id = "${id}"`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  // updateUser: (id, data) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       "UPDATE users SET ? WHERE id = ?",
  //       [data, id],
  //       (error, result) => {
  //         if (!error) {
  //           resolve(result);
  //         } else {
  //           reject(error);
  //         }
  //       }
  //     );
  //   });
  // },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET ? WHERE id = ?`, [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateStoreUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE stores SET ? WHERE user_id = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE id = "${id}"`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  activation: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET status = "active" WHERE email="${email}"`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
