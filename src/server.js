//server.js
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var FitbitApiClient = require('fitbit-node');

var Card = require('../model/cards');
var StepsDay = require('../model/steps_day');

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

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!' });
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
    .get('/sleep/date/2017-04-01/2018-03-29.json', res.access_token)
    .then(results => {
      // res.send(results[0]);
      // var day = new StepsDay();
      // day.date = new Date('2011-12-12');
      // day.step_count = 1234;
      // day.save(function(err, day) {
      //   if (err) return console.error(err);
      //   console.log(day.step_count);
      // });
      console.log(results);
      // for (var sleep_hour of results[0]['activities-steps']) {
      //   var day = new StepsDay();
      //   day.date = new Date(step_day['dateTime']);
      //   day.step_count = parseInt(step_day['value']);
      //   day.save(function(err, day) {
      //     if (err) return console.error(err);
      //     console.log(day.steps);
      //   });
      // }
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

// router.route('/heart').get(function(req, res) {
//   res.redirect(client.get('/activities/heart/date/2018-03-01/1m.json'))
// })

router.route('/steps').get(function(req, res) {
  StepsDay.find(function(err, steps_days) {
    if (err) {
      res.send(err);
    }
    var results = steps_days.map(s => s.step_count);
    res.json(results);
  });
});

router.route('/sleep').get(function(req, res) {
  // client
  //   .get('/sleep/date/2017-04-01/2018-03-29.json', res.access_token)
  //   .then(results => {
  //     // res.send(results[0]);
  //     // var day = new StepsDay();
  //     // day.date = new Date('2011-12-12');
  //     // day.step_count = 1234;
  //     // day.save(function(err, day) {
  //     //   if (err) return console.error(err);
  //     //   console.log(day.step_count);
  //     // });
  //     console.log(results);
  //     // for (var sleep_hour of results[0]['activities-steps']) {
  //     //   var day = new StepsDay();
  //     //   day.date = new Date(step_day['dateTime']);
  //     //   day.step_count = parseInt(step_day['value']);
  //     //   day.save(function(err, day) {
  //     //     if (err) return console.error(err);
  //     //     console.log(day.steps);
  //     //   });
  //     // }
  //   })
  //   .catch(err => {
  //     res.status(err.status).send(err);
  //   });
  console.log('hit sleep endpoint');
  // SleepHours.find(function(err, sleep_days) {
  //   if (err) {
  //     res.send(err);
  //   }
  //   var results = sleep_days.map(s => s.sleep_hours);
  //   res.json(results);
  // });
});

router.route('/cards').get(function(req, res) {
  Card.find(function(err, cards) {
    if (err) {
      res.send(err);
    }
    res.json(cards);
  });
});

app.use('/api', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
