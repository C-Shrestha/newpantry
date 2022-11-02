const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', async (req, res) => {
    request({
        uri: 'https://www.themealdb.com/api/json/v1/1/filter.php',
        qs: req.query
    }, (err, response, body) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(body);
        }
    });
});

module.exports = router;