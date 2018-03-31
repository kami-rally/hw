'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardsSchema = new Schema({
  title: String,
  endpoint: String,
});

module.exports = mongoose.model('Card', CardsSchema);
