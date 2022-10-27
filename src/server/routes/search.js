const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/', async (req, res) => {
    request({
        uri: 'www.themealdb.com/api/json/v1/1/filter.php',
        qs: {
            s: req.body.str
        }
    }).pipe(res);

  res.status(200).send(res);
});

module.exports = router;