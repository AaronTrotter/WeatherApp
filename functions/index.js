const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require('express');
const engines = require('consolidate');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '0cb283b0d1133d96666eab4166fb3fc1';

const port = 5000;

// app.engine('html', require('ejs').renderFile);
// app.engine('html', engines.ejs);

app.engine('ejs', require('ejs').__express);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views',  './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})

app.listen(port, function () {
    console.log('Example app listening on port: ' + port);
})

//https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b

exports.app = functions.https.onRequest(app);