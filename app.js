const express = require('express');
const app = express();

const morgan = require('morgan');

const drinkersRoute = require('./api/routes/drinkers');

app.use(morgan('dev'));

app.use('/drinkers', drinkersRoute);

module.exports = app;