"use strict";
const express = require('express');
const app = express();
const request_ = require('request-promise');
const cors = require('cors');
const bodyPar = require('body-parser');
const array = require('./city.list.js');

app.use(cors());
app.use(bodyPar.json());

app.use(bodyPar.urlencoded())
app.get('/', (req, res) => {
	
})


app.post('/json', (req, res) => {
    let user_data = req.body,
		options = {
		    uri: 'http://api.openweathermap.org/data/2.5/weather',
		    qs: {
		        lat: user_data.lat,
		        lon: user_data.lon,
		        appid: '5eb1c443d933d13fc84858f91ebad2b0',
		        lang: 'RU'
		    },
		    json: true // Automatically parses the JSON string in the response
		};
    request_(options)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            res.send(err);
        })
});

app.post('/find-city', (req, res) => {
    let datCityName = req.body,
		options = {
		    uri: 'http://api.openweathermap.org/data/2.5/weather',
		    qs: {
		    	q: datCityName.cityName,
		        appid: '5eb1c443d933d13fc84858f91ebad2b0',
		        lang: 'RU'
		    },
		    json: true // Automatically parses the JSON string in the response
		};
    request_(options)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            res.send(err);
        })
});

// app.post('/find-city', (req, res) => {
//     let datCityName = req.body,
// 		options = {
// 		    uri: 'http://api.openweathermap.org/data/2.5/find',
// 		    qs: {
// 		    	q: datCityName.cityName,
// 		        appid: '5eb1c443d933d13fc84858f91ebad2b0'
// 		    },
// 		    json: true // Automatically parses the JSON string in the response
// 		};
//     request_(options)
//         .then(function (response) {
//             res.send(response);
//         })
//         .catch(function (err) {
//             res.send(err);
//         })
// });

app.listen(3000);