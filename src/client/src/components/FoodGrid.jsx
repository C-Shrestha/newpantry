import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material'
import "./FoodGrid.css";

export const FoodGrid = () => {
  const [meals, setMeals] = useState([]);
  const [latestMeals, setLatestMeals] = useState([]);
  var seasonalMeals = [];

  const getSeasonalMeals = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52784',
      );
      const jsonMeals = await response.json();
      seasonalMeals.push(jsonMeals.meals[0]);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52866',
      );
      const jsonMeals = await response.json();
      seasonalMeals.push(jsonMeals.meals[0]);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52857',
      );
      const jsonMeals = await response.json();
      seasonalMeals.push(jsonMeals.meals[0]);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52994',
      );
      const jsonMeals = await response.json();
      seasonalMeals.push(jsonMeals.meals[0]);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52845',
      );
      const jsonMeals = await response.json();
      seasonalMeals.push(jsonMeals.meals[0]);
    } catch (error) {
      console.log(error);
    }
    setMeals(seasonalMeals);
  };

  const getLastestMeals = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v2/9973533/latest.php',
      );
      const jsonMeals = await response.json();
      console.log(jsonMeals.meals);
      setLatestMeals(jsonMeals.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSeasonalMeals();
    getLastestMeals();
  }, []);

  return (
        <div className="foodGrid">
            <h1>SEASONAL RECOMENDATIONS</h1>
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {meals.map((meal) => (
                <Grid item xs={2} sm={4} md={4} key={meal.idMeal}>
                   <div className="card" 
                    style={{
                        backgroundImage: `url(${meal.strMealThumb})`,
                    }}>
                    <div className="title">{meal.strMeal}</div>
                    <button className='heartbtn'><FontAwesomeIcon icon={faHeart} transform="grow-20" /></button>
                    </div>
                    
                </Grid>
            ))}
            </Grid>
            <h1 id="t">TRENDING</h1> 
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {latestMeals.map((meall) => (
                <Grid item xs={2} sm={4} md={4} key={meall.idMeal}>
                <div className="card" 
                 style={{
                     backgroundImage: `url(${meall.strMealThumb})`,
                 }}>
                 <div className="title" id="trend">{meall.strMeal}</div>
                 <button className='heartbtn' id="trending"><FontAwesomeIcon icon={faHeart} transform="grow-20" /></button>
                 </div>
             </Grid>
            ))}
            </Grid>
        </div>
  );
};

export default FoodGrid;
