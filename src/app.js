const express = require('express');
const apis = require('./routes/api.js');
const errorHandler = require('./utils/errorHandler.js');
const app = express()
const cors = require('cors');

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions));

app.use('/api/v1', apis);

app.use(errorHandler.invalidEndPoint)

app.use((error, _request, response, _next) => {
    return response.status(error.statusCode || 403).json(errorHandler.makeErrorResponse(error))
})


module.exports = app