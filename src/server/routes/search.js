const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/', async (req, res) => {

    request({
        uri: 'https://www.themealdb.com/api/json/v1/1/filter.php',
        qs: {
            i: req.body.search
        }
    }).pipe(res.status(200));

});

module.exports = router;