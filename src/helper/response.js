/* eslint-disable no-undef */
module.exports = {
  response: (res, message, result, status, error) => {
    let resultPrint = {};

    resultPrint.error = error || false;
    resultPrint.status = status || 200;
    resultPrint.message = message || null;
    resultPrint.result = result || [];

    return res.status(resultPrint.status).json(resultPrint);
  },

  responsePagination: (res, message, status, error, pageDetail, data) => {
    let resultPrint = {};
    resultPrint.status = status || 200;
    resultPrint.error = error || false;
    resultPrint.message = message || 'Success';
    resultPrint.pageDetail = pageDetail || {};
    resultPrint.data = data || {};

    return res.status(resultPrint.status).json(resultPrint);
  },
};
