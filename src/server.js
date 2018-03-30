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
  apiVersion: '1.2', // 1.2 is the default
});

mongoose.connect('mongodb://kamimern:falafel@ds121089.mlab.com:21089/mern');

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

// router.route('/heart').get(function(req, res) {
//   res.redirect(client.get('/activities/heart/date/2018-03-01/1m.json'))
// })

router.get('/callback', function(req, res) {
  // res.json({ response: res.code });
  // res.redirect('http://localhost:3000/');
  // debugger;
  client
    .getAccessToken(req.query.code, 'http://localhost:3001/api/callback')
    .then(result => {
      // use the access token to fetch the user's profile information
      // client
      //   .get('/profile.json', result.access_token)
      //   .then(results => {
      //     res.send(results[0]);
      //   })
      //   .catch(err => {
      //     res.status(err.status).send(err);
      //   });
      client
        .get('/activities/steps/date/today/1y.json', result.access_token)
        .then(results => {
          // res.send(results[0]);

          for (var step_day of results[0]['activities-steps']) {
            var date = new Date(step_day['dateTime']);
            var steps = parseInt(step_day['value']);
            // day = new StepsDay({ date: date, step_count: steps });
            // console.log(day.date);
            console.log(date);
          }
        })
        .catch(err => {
          res.status(err.status).send(err);
        });
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

router
  .route('/cards')
  .get(function(req, res) {
    Card.find(function(err, cards) {
      if (err) {
        res.send(err);
      }
      res.json(cards);
    });
  })
  .post(function(req, res) {
    var card = new Card();
    card.title = req.query.title;
    card.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: `New card '${card.title}' successfully added!` });
    });
  });

app.use('/api', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
