//server.js
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var FitbitApiClient = require('fitbit-node');

var Card = require('../model/cards');
var StepsDay = require('../model/steps_day');
var HeartDay = require('../model/heart_day');
var SleepHours = require('../model/sleep_hours');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

const client = new FitbitApiClient({
  clientId: '22CVNC',
  clientSecret: '9cc65613018328fc7d65c697fb2333ac',
  apiVersion: '1.2',
});

mongoose.connect('mongodb://kamimern:falafel@ds121089.mlab.com:21089/mern');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api', router);

router.route('/cards').get(function(req, res) {
  Card.find(function(err, cards) {
    if (err) {
      res.send(err);
    }
    res.json(cards);
  });
});

router.route('/authorize').get(function(req, res) {
  res.redirect(
    client.getAuthorizeUrl(
      'activity heartrate location nutrition profile settings sleep social weight',
      'http://localhost:3001/api/callback'
    )
  );
});

router.route('/callback').get(function(req, res) {
  // StepsDay.find().exec(function(err, stepsDays) {
  //   if (err) {
  //     res.send(err);
  //   }
  //   for (var stepsday of stepsDays) {
  //     stepsday.date = new Date(stepsday.date).toISOString().slice(0, 10);
  //     stepsday.save(function(err, day) {
  //       if (err) return console.error(err);
  //       console.log(day.date);
  //     });
  //   }
  // });
  // client
  //   .getAccessToken(req.query.code, 'http://localhost:3001/api/callback')
  //   .then(result => {
  //     // use the access token to fetch the user's profile information
  //     client
  //       .get('/activities/heart/date/2017-04-01/2018-03-30.json', result.access_token)
  //       .then(results => {
  //         for (var heartday of results[0]['activities-heart']) {
  //           var day = new HeartDay();
  //           day.date = heartday['dateTime'];
  //           day.heart_rate = parseInt(heartday['value']['restingHeartRate']);
  //           day.save(function(err, day) {
  //             if (err) return console.error(err);
  //             console.log(day.heart_rate);
  //           });
  //         }
  //       })
  //       .catch(err => {
  //         res.status(err.status).send(err);
  //       });
  //   })
  //   .catch(err => {
  //     res.status(err.status).send(err);
  //   });
});

router.route('/steps').get(function(req, res) {
  var start = '2017-04-01';
  var end = '2017-06-01';
  StepsDay.find({ date: { $gte: start, $lt: end } })
    .sort('date')
    .exec(function(err, stepsDays) {
      if (err) {
        res.send(err);
      }
      var results = stepsDays.map(s => [Date.parse(s.date), s.step_count]);
      res.json(results);
      // res.json(results.slice(0, 25));
    });
});

router.route('/sleep').get(function(req, res) {
  var start = '2017-04-01';
  var end = '2017-06-01';
  SleepHours.find({ date: { $gte: start, $lt: end } })
    .sort('date')
    .exec(function(err, sleepHours) {
      if (err) {
        res.send(err);
      }
      var results = sleepHours.map(s => [Date.parse(s.date), s.duration / 3600000.0]);
      res.json(results);
      // res.json(results.slice(0, 25));
    });
});

router.route('/heartrate').get(function(req, res) {
  var start = '2017-04-01';
  var end = '2017-06-01';
  HeartDay.find({ date: { $gte: start, $lt: end } })
    .sort('date')
    .exec(function(err, heartDays) {
      if (err) {
        res.send(err);
      }
      var results = heartDays.map(h => [Date.parse(h.date), h.heart_rate]);
      res.json(results);
      // res.json(results.slice(0, 25));
    });
});

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
