import { faHeart, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Grid, Modal, Box} from '@mui/material'
import "./FoodGrid.css";

function SearchGrid(props){
    const [meals, setMeals] = useState([]);
    const [heart, setHeart] = useState([]);
    const [search, setSearch] = useState(props.value);
    const [openModal, setOpenModal] = useState();
    const [ingredients, setIngredients] = useState([]);

    var searchMeals = [];

    useEffect(() => {
        if (props.value !== search){
            setSearch(props.value);
            setMeals([]);
        }
        getLastestMeals();
        getHearts();
      }, [props.value]);

    const getLastestMeals = async () => {
        var loadingDiv = document.getElementById("loadingDiv2");
        loadingDiv.style.display = "flex";
        if(search !== ''){
            try {
                const response = await fetch(
                `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${props.value}`,
                )
                const jsonMeals = await response.json();
                var no = document.getElementById("nothing");
                if(props.value === 'none'){
                    no.style.display = 'none';
                    loadingDiv.style.display = "none";
                }
                else if(jsonMeals.meals === null){
                    loadingDiv.style.display = "none";
                    no.style.display ='block';
                    no.innerHTML = "No recipes found";
                }
                else{
                    no.style.display = 'none';
                    searchMeals = [];
                    for(let i =0; i<jsonMeals.meals.length; i++){
                        if(jsonMeals.meals[i]== null){
                            continue;
                        }
                        try {
                            const response = await fetch(
                                `https://www.themealdb.com/api/json/v1/1/search.php?s=${jsonMeals.meals[i].strMeal}`,
                            );
                            const json = await response.json();
                            if (!searchMeals.includes(json.meals[0].idMeal)) {
                                searchMeals.push(json.meals[0]);
                            }

                        } catch (error) {
                            console.log(error);
                        } 
                    }
                    setMeals(searchMeals);
                    loadingDiv.style.display = "none";
                }
            } catch (error) {
                console.log(error);
            }
        }
    
    };

    const getHearts = async () => {
        var token = localStorage.getItem('token-info');
        var email = localStorage.getItem('email-info');
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
            setHeart(json);
        } catch (error){
            console.log(error);
        }; 
    }

    const getIngredients = (meal) => {
        let food = [];
        for(let i =0; i<20; i++){
            let ingredient = `strIngredient${i+1}`;
            let measurement = `strMeasure${i+1}`;
            if(meal[ingredient] !== "" && meal[ingredient] !== null){
            food.push(meal[measurement] + " " + meal[ingredient]);
            }
        }
        setIngredients(food);
    }
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
        var token = localStorage.getItem('token-info');
        var email = localStorage.getItem('email-info');
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
            setHeart(json);
        } catch (error){
            console.log(error);
        }; 
    }

    return (
        <div>
           <h1 id="nothing"></h1>
           <div className="loadingDiv" id="loadingDiv2">
              <div className="loading-spinner"><div className="loading">
                <div></div>
              </div></div>
            </div>
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {meals.map((meal) => (
                <Grid item xs={2} sm={4} md={4} key={meal.idMeal}>
                    
                    <div  onClick={() => {setOpenModal(meal.idMeal); getIngredients(meal);}} className="card" 
                    style={{
                        backgroundImage: `url(${meal.strMealThumb})`,
                    }} >
                    <div className="title" style={{backgroundColor: '#A5BA78'}}>{meal.strMeal}</div>
                    <button style={{color: "white", backgroundColor: heart.includes(meal.strMeal) ? "#E54829": "#FABC4F"}}
                    onClick={(event) => handleRequestClick(event, meal.strMeal)} className='heartbtn'><FontAwesomeIcon icon={faHeart} transform="grow-20" /></button>
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
        </div>
    );
}
export default SearchGrid;
