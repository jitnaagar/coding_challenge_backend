require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('_middleware/error-handler');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/api/customers', require('./customers/customers.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, () => console.log('Server listening on port ' + port));