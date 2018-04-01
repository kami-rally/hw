'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SleepHoursSchema = new Schema({
  date: String,
  duration: Number,
  efficiency: Number,
});

module.exports = mongoose.model('SleepHours', SleepHoursSchema);
