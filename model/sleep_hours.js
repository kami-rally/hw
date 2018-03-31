'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SleepHoursSchema = new Schema({
  date: Date,
  step_count: Number,
});

module.exports = mongoose.model('SleepHours', SleepHoursSchema);
