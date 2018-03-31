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
  client
    .getAccessToken(req.query.code, 'http://localhost:3001/api/callback')
    .then(result => {
      // use the access token to fetch the user's profile information
      // client
      //   .get('/sleep/date/2017-01-01/2017-03-30.json', result.access_token)
      //   .then(results => {
      //     for (var sleep_day of results[0]['sleep']) {
      //       var day = new SleepHours();
      //       day.date = sleep_day['dateOfSleep'];
      //       day.duration = parseInt(sleep_day['duration']);
      //       day.efficiency = parseInt(sleep_day['efficiency']);
      //       day.save(function(err, day) {
      //         if (err) return console.error(err);
      //         console.log(day.steps);
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     res.status(err.status).send(err);
      //   });
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

router.route('/steps').get(function(req, res) {
  StepsDay.find(function(err, stepsDays) {
    if (err) {
      res.send(err);
    }
    var results = stepsDays.map(s => s.step_count);
    res.json(results);
  });
});

router.route('/sleep').get(function(req, res) {
  SleepHours.find(function(err, sleepHours) {
    if (err) {
      res.send(err);
    }
    var results = sleepHours.map(s => s.duration);
    res.json(results);
  });
});

router.route('/heartrate').get(function(req, res) {
  HeartDay.find(function(err, heartDays) {
    if (err) {
      res.send(err);
    }
    var results = heartDays.map(h => h);
    res.json(results);
  });
});

// router.route('/heart').get(function(req, res) {
//   res.redirect(client.get('/activities/heart/date/2018-03-01/1m.json'))
// })

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
