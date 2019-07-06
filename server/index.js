//"use strict";
const express = require('express');
const app = express();
// const request_ = require('request-promise');
// const geolocation = require('geolocation');
// const cors = require('cors');

//app.use(cors());

app.get('/', (req, res)=> {
    res.send([
        {
            name:'test1'
        }
    ]);
});

// app.get('/ip', (req, res) => {
//     request_(`https://ipinfo.io/`)
//         .then(function (response) {
//             res.send(response)
//         })
//         .catch(function (err) {
//             console.log('Err')
//         })
// });

app.listen(3000);