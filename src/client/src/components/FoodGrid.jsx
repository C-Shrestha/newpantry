import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faHeart, faUnderline } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {Grid, Modal, Box, Typography} from '@mui/material'
import "./FoodGrid.css";

export const FoodGrid = () => {
  const [meals, setMeals] = useState([]);
  const [latestMeals, setLatestMeals] = useState([]);
  const [openModal, setOpenModal] = useState();

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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleRequestClick = async (e, meal) => {

    e.stopPropagation()
    var s = document.cookie.split(" ");
    var token = s[0];
    var email = s[1];
    const URL = 'https://newpantry.herokuapp.com/api/favorites';
    const body = JSON.stringify({email: email, favorite: meal});
    try{
        const response = await fetch(URL, {
            method: 'POST',
            body: body,
            headers: {
            'Content-Type': 'application/json', 
             'Authorization': token
            },
        });
        const json = await response.json();      
    } catch (error){
        console.log(error);
    }; 

} 

  return (
        <div className="foodGrid">
            <h1>SEASONAL RECOMENDATIONS</h1>
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {meals.map((meal) => (
                <Grid item xs={2} sm={4} md={4} key={meal.idMeal}>
                      
                      <div onClick={() => setOpenModal(meal.idMeal)} className="card" 
                      style={{
                          backgroundImage: `url(${meal.strMealThumb})`,
                      }} >
                      <div className="title">{meal.strMeal}</div>
                      <button onClick={(event) => handleRequestClick(event, meal.strMeal)} className='heartbtn'><FontAwesomeIcon icon={faHeart} transform="grow-20" /></button>
                      </div>
                      
                      <Modal
                      open={openModal === meal.idMeal}
                      onClose={() => setOpenModal(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          {meal.strMeal}
                          <img src={meal.strMealThumb} alt="food"></img>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {meal.strInstructions}
                        </Typography>
                      </Box>
                    </Modal>
                    
                </Grid>
            ))}
            </Grid>
            <h1 id="t">TRENDING</h1> 
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {latestMeals.map((meall) => (
                <Grid item xs={2} sm={4} md={4} key={meall.idMeal}>
                <div className="card" onClick={() => setOpenModal(meall.idMeal)} 
                 style={{
                     backgroundImage: `url(${meall.strMealThumb})`,
                 }}>
                 <div className="title" id="trend">{meall.strMeal}</div>
                 <button onClick={(event) => handleRequestClick(event, meall.strMeal)} className='heartbtn' id="trending"><FontAwesomeIcon icon={faHeart} transform="grow-20" /></button>
                 </div>
                 <Modal
                      open={openModal === meall.idMeal}
                      onClose={() => setOpenModal(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          {meall.strMeal}
                          <img src={meall.strMealThumb} alt="food"></img>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {meall.strInstructions}
                        </Typography>
                      </Box>
                    </Modal>
             </Grid>
            ))}
            </Grid>
        </div>
  );
};

export default FoodGrid;
