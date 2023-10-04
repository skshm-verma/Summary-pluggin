const constants = require('../config/constant');


exports.invalidEndPoint = (request, response, next) => {
    const error = new Error('Invalid Endpoint!');
    error.statusCode = 404;
    throw error;
};

exports.createError = statusCode => {
    const error = new Error(constants[statusCode]);
    error.statusCode = statusCode;
    return error;
};

exports.makeErrorResponse = error => {
    const status = error.statusCode || 500;
    const message = error.message || 'Server Error';
    let response = { status: false, code: status, message: message, data: {} };
    return response;
};