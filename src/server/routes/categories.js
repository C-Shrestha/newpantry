const express = require('express');
const router = express.Router();

const request = require('request');

const categories = [
  "Beef", 
  "Breakfast", 
  "Chicken", 
  "Dessert", 
  "Goat", 
  "Lamb", 
  "Pasta", 
  "Pork", 
  "Seafood", 
  "Side", 
  "Starter", 
  "Vegan", 
  "Vegetarian", 
  "Misc"
];

router.get('/', async(req, res) => {
  if (!(categories.includes(req.query.c))) {
    res.status(400).send("Invalid category");
  } else {
    request({
      uri: 'https://www.themealdb.com/api/json/v1/1/filter.php',
      qs: req.query
    }, (err, response, body) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(JSON.parse(body).meals.slice(0, 10));
      }
    });
  }
});

module.exports = router;