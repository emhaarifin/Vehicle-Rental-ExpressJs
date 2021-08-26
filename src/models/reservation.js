const connection = require('../../src/confiq/db');

module.exports = {
  addReservation: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO reservation set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  getReservation: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT reservation.*, vehicles.image, vehicles.name as VehicleName FROM reservation LEFT JOIN vehicles ON reservation.vehicleId = vehicles.id WHERE reservation.userId = "${userId}"`,
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
  getResult: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT reservation.*, vehicles.image, vehicles.name as VehicleName FROM reservation LEFT JOIN vehicles ON reservation.vehicleId = vehicles.id WHERE reservation.id = "${id}"`,
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
