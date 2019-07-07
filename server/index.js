"use strict";
const express = require('express');
const app = express();
const request_ = require('request-promise');
const cors = require('cors');
const bodyPar = require('body-parser');

app.use(cors());
app.use(bodyPar.json());
app.use(bodyPar.urlencoded())

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

// app.post('/find-city', (req, res) => { // хотел реализовать с поиском ID не вышло
//     let datCityName = req.body,		// Транслитировать корректно выходит не все города
// 		options = {						// в частности Москва - Moscow

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