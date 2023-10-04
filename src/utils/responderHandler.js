const constants = require('../config/constant');

module.exports = (_request, response, _next, status, messageCode, data) => {
    response.status(200).json({
        status: status,
        statusCode: messageCode,
        message: constants[messageCode],
        data: data,
    });
};