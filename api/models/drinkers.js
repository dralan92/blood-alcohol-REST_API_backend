const mongoose = require('mongoose');

const drinkerSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    email : String,
    password : String,
    phone : String,
    age : Number,
    gender : String,
    weight : String,
    liters_of_blood : Number,
    grams_of_alcohol : Number,
    alcohol_removal_rate : Number,
    current_time : Date,
    last_drink_time : Date,
    time_past : Date,
    sober_time : Date,
    status : String
});

module.exports = mongoose.model('Drinker', drinkerSchema);