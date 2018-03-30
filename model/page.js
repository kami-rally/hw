'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
  user_name: String,
  user_avatar: String,
});

module.exports = mongoose.model('Page', PageSchema);
