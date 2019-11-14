const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '0cb283b0d1133d96666eab4166fb3fc1';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

// app.get('/', function (req, res) {
//     res.send('Hello World!')
// })

app.get('/', function (req, res) {
    // NEW CODE
    res.render('index');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);
            console.log(body);
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})

//https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b