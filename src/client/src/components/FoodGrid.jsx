import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faHeart, faCircle, faHouseMedicalCircleCheck } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {Grid, Modal, Box} from '@mui/material'
import "./FoodGrid.css";

export const FoodGrid = () => {
  const [meals, setMeals] = useState([]);
  const [latestMeals, setLatestMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
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
    width: '80vw',
    height: '40vw',
    bgcolor: '#4F5E30',
    color: 'white',
    fontFamily: 'Barlow Semi Condensed',
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

const getIngredients = (meal) => {
  console.log("in function"); 
  let food = [];
  for(let i =0; i<20; i++){
    let ingredient = `strIngredient${i+1}`;
    let measurement = `strMeasure${i+1}`;
    if(meal[ingredient] !== ""){
      food.push(meal[measurement] + " " + meal[ingredient]);
    }
  }
  setIngredients(food);
}

  return (
        <div className="foodGrid">
            <h1>SEASONAL RECOMENDATIONS</h1>
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {meals.map((meal) => (
                <Grid item xs={2} sm={4} md={4} key={meal.idMeal}>
                      
                      <div  onClick={() => {setOpenModal(meal.idMeal); getIngredients(meal);}} className="card" 
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
                        <div className="name">
                          {meal.strMeal}
                        </div>
                        <div className="grid">
                          <div className="gridItem">
                            <text>INSTRUCTIONS</text><br/>
                            <div className='list2'>{ingredients.map((ing) => (
                              <div className="listI">
                                <FontAwesomeIcon id="circle" icon={faCircle} transform="shrink-7"/>&nbsp;&nbsp;{ing}
                              </div>
                            ))}</div><br/>
                            <text>DIRECTIONS</text><br/>
                            <div className="direct">{meal.strInstructions}</div>
                          </div>
                          <div className="gridItem">
                            <img src={meal.strMealThumb} alt="food"></img>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                    
                </Grid>
            ))}
            </Grid>
            <h1 id="t">TRENDING</h1> 
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {latestMeals.map((meall) => (
                <Grid item xs={2} sm={4} md={4} key={meall.idMeal}>
                <div className="card" onClick={() => {setOpenModal(meall.idMeal); getIngredients(meall);}}
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
                        <div className="name">
                          {meall.strMeal}
                        </div>
                        <div className="grid">
                          <div className="gridItem">
                            <text>INSTRUCTIONS</text><br/>
                            <div className='list2'>{ingredients.map((ing) => (
                              <div className="listI">
                                <FontAwesomeIcon id="circle" icon={faCircle} transform="shrink-7"/>&nbsp;&nbsp;{ing}
                              </div>
                            ))}</div><br/>
                            <text>DIRECTIONS</text><br/>
                            <div className="direct">{meall.strInstructions}</div>
                          </div>
                          <div className="gridItem">
                            <img src={meall.strMealThumb} alt="food"></img>
                          </div>
                        </div>
                      </Box>
                    </Modal>
             </Grid>
            ))}
            </Grid>
        </div>
  );
};

export default FoodGrid;
