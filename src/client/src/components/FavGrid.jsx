import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faHeart, faUnderline } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {Grid, Modal, Box, Typography} from '@mui/material'
import "./FoodGrid.css";

export const FavGrid = () => {
  const [meals, setFavMeals] = useState([]);
  const [openModal, setOpenModal] = useState();

  var favMeals = [];

  const getFavMeals = async () => {
    var s = document.cookie.split(" ");
    var token = s[0];
    var email = s[1];
    const URL = 'https://newpantry.herokuapp.com/api/favorites';
    const body = JSON.stringify({email: email});
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
        for(let i =0; i<json.length; i++){
            if(json[i]== null){
                continue;
            }
            try {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${json[i]}`,
                );
                const jsonMeals = await response.json();
                favMeals.push(jsonMeals.meals[0]);

                } catch (error) {
                console.log(error);
                } 
        }
        setFavMeals(favMeals);
    } catch (error){
        console.log(error);
    }; 
  };

  useEffect(() => {
    getFavMeals();
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
    window.location.reload();
} 

  return (
        <div className="foodGrid">
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {meals.map((meal) => (
                <Grid item xs={2} sm={4} md={4} key={meal.idMeal}>
                      <div onClick={() => setOpenModal(meal.idMeal)} className="card" 
                      style={{
                          backgroundImage: `url(${meal.strMealThumb})`,
                      }} >
                      <div className="title">{meal.strMeal}</div>
                      <button onClick={(event) => handleRequestClick(event, meal.strMeal)} className='heartbtn' id="heart"><FontAwesomeIcon icon={faHeart} transform="grow-20" /></button>
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
        </div>
  );
};

export default FavGrid;
