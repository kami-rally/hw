'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeartDaySchema = new Schema({
  date: String,
  heart_rate: Number,
});

module.exports = mongoose.model('HeartDay', HeartDaySchema);
