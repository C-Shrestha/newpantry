const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', async (req, res) => {
    request(process.env.MEALDB_URL + 'filter.php?i=' + req.body.ingredients.join(','), (error, response, data) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(JSON.parse(data).meals);
        }
    })
});

module.exports = router;