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
  payReservation: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE reservation SET ? WHERE id = ?`, [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  getReservationById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT reservation.*, vehicles.name as VehicleName, vehicles.image, category.name_category, location.name_location FROM reservation LEFT JOIN vehicles ON reservation.vehicleId = vehicles.id LEFT JOIN category ON vehicles.category_id = category.id LEFT JOIN location ON vehicles.location_id = location.id WHERE reservation.id = "${id}"`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
};
