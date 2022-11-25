import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faHeart, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from "react-swipeable";
import React, {useEffect, useState} from 'react';
import {Grid, Modal, Box} from '@mui/material'
import "./FoodGrid.css";

export const FoodGrid = () => {
  const [meals, setMeals] = useState([]);
  const [latestMeals, setLatestMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [openModal, setOpenModal] = useState();
  const [heart, setHeart] = useState([]);
  const [lightColor, setLightColor] = useState("#F4B278");
  const [noClick, setNoClick] = useState(false);

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
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52812',
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
      setLatestMeals(jsonMeals.meals);
    } catch (error) {
      console.log(error);
    }
  };
  
  /* duplicate function as handleRequestClick
  * needed to load favorite recipes before a click 
  * has been made to show red favorited recipes
  */
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

  useEffect(() => {
    getSeasonalMeals();
    getLastestMeals();
    getHearts();
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
        console.log(json);
        setHeart(json);
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
      if(meal[ingredient] !== "" && meal[ingredient] !== null){
        food.push(meal[measurement] + " " + meal[ingredient]);
      }
    }
    setIngredients(food);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
      if(newIndex < 0){
          newIndex = 0;
      }
      else if(newIndex >= 14/2){
          newIndex = 14 - 7;
      }

      setActiveIndex(newIndex);
  };

  const categoryRequest = async(categoryStr) =>{
    seasonalMeals = [];
    var seasonalDiv = document.getElementById("seasonalDiv");
    var trendingDiv = document.getElementById("trendingDiv");
    var loadingDiv = document.getElementById("loadingDiv");

    var seasonalHeader = document.getElementById("seasonalHeader");
    var title = document.getElementById("title");

    setNoClick(true);

    loadingDiv.style.display = "flex";
    seasonalDiv.style.display = "none";
    trendingDiv.style.display = "none";
    
    var list = [["#FABC4F", "#FDD898"], ["#A5BA78", "#A5BA78"], ["#EA862D", "#F4B278"], ["#5E5684", "#958BC4"], ["#E54829", "#DB8D7E"], ["#4F5E30", "#94A474"]];

    var idx = Math.round(Math.random() * 5 + 0);

    setMeals([]);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryStr}`,
      );
      const jsonMeals = await response.json();
      var slicedMeals = jsonMeals.meals.slice(0, 21);
      
      for(let i = 0; i < slicedMeals.length; i++){
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${slicedMeals[i].idMeal}`,
          );
          const catMeals = await response.json();
          seasonalMeals.push(catMeals.meals[0]);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setMeals(seasonalMeals);

    seasonalHeader.innerHTML = categoryStr;
    loadingDiv.style.display = "none";
    seasonalDiv.style.display = "block";

    seasonalHeader.style.color = list[idx][0];
    setLightColor(list[idx][1]);
    setNoClick(false);
  }


  return (
        <div className="foodGrid">
            <div {...handlers} className="carousel">
              <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Beef')}>Beef</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Breakfast')}>Breakfast</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Chicken')}>Chicken</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Dessert')}>Dessert</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Goat')}>Goat</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Lamb')}>Lamb</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Pasta')}>Pasta</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Pork')}>Pork</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Seafood')}>Seafood</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Side')}>Side</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Starter')}>Starter</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Vegan')}>Vegan</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Vegetarian')}>Vegetarian</div>
                <div className="carousel-item" id="carousel-item" style = {{width:"100%", pointerEvents: noClick ? "none": "all"}} onClick={() => categoryRequest('Miscellaneous')}>Misc</div>
              </div>
              <div className="indicators">
                <button class ="prev" onClick={()=> {updateIndex(activeIndex - 1);}}>
                    <FontAwesomeIcon class="image" icon={faCaretLeft} />
                </button>
                <button class ="next" onClick={()=> {updateIndex(activeIndex + 1);}}>
                    <FontAwesomeIcon class="image" icon={faCaretRight} />
                </button>
              </div>
            </div>
            <div className="loadingDiv" id="loadingDiv">
              <div className="loading-spinner"><div className="loading">
                <div></div>
              </div></div>
            </div>
            <div id="seasonalDiv">
              <h1 id="seasonalHeader">SEASONAL RECOMENDATIONS</h1>
              <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
              {meals.map((meal) => (
                  <Grid item xs={2} sm={4} md={4} key={meal.idMeal}>
                        
                        <div  onClick={() => {setOpenModal(meal.idMeal); getIngredients(meal);}} className="card" 
                        style={{
                            backgroundImage: `url(${meal.strMealThumb})`,
                        }} >
                        <div className="title" style={{backgroundColor: lightColor}}>{meal.strMeal}</div>
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
          <div id="trendingDiv">
            <h1 id="t">TRENDING</h1> 
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} p={8}>
            {latestMeals.map((meall) => (
                <Grid item xs={2} sm={4} md={4} key={meall.idMeal}>
                <div className="card" onClick={() => {setOpenModal(meall.idMeal); getIngredients(meall);}}
                style={{
                    backgroundImage: `url(${meall.strMealThumb})`,
                }}>
                <div className="title" id="trend">{meall.strMeal}</div>
                <button style={{color: "white", backgroundColor: heart.includes(meall.strMeal) ? "#E54829": "#FABC4F"}}
                  onClick={(event) => handleRequestClick(event, meall.strMeal)} className='heartbtn' id="trending"><FontAwesomeIcon icon={faHeart} transform="grow-20" /></button>
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
        </div>
  );
};

export default FoodGrid;
