const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const drinkersRoute = require('./api/routes/drinkers');

mongoose.connect('mongodb+srv://dralan:dralan@cluster0-lfliu.mongodb.net/test?retryWrites=true');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/drinkers', drinkersRoute);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});

module.exports = app;