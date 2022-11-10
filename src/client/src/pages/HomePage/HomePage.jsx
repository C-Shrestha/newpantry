import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import Carousel, { CarouselItem } from "../../components/Carousel";
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import FoodGrid from '../../components/FoodGrid';
import React, {Component} from 'react';
import './HomePage.css';

export default class HomePage extends Component{
    
    constructor(props){
        super(props);
        if(document.cookie == ""){
            window.location.href = "https://newpantry.herokuapp.com"
        }
        else{
            this.state = {
                token: document.cookie
            };
        }
    }

    hideIcon(){
        var search = document.getElementById("search");
        search.style.visibility = "hidden";
    }
    showIcon(){
        var search = document.getElementById("search");
        search.style.visibility = "visible";
    }

    render(){
        return(
            <div className='landing'>
                <div className="nav-bar">
                    <div><a href="/">
                        <img class ="pantry-pic" src="/PantryHorizontal.png" alt="pantry icon"/>    
                    </a></div>
                    <div className="li"><a class="links" href="/home" id="active">Home</a></div>
                    <div className="li"><a class="links" href="/favorites">Favorites</a></div>
                    <div className="li" >
                        <FontAwesomeIcon className="search-pic" id="search" icon={faMagnifyingGlass}/>
                        <input onMouseEnter={this.hideIcon} onMouseLeave={this.showIcon}></input>
                    </div>
                    <div className="li">
                        <FontAwesomeIcon class="profile-pic" icon={faUser} />
                    </div>
                </div>
                <Carousel>
                    <CarouselItem>Beef</CarouselItem>
                    <CarouselItem>Breakfast</CarouselItem>
                    <CarouselItem>Chicken</CarouselItem>
                    <CarouselItem>Dessert</CarouselItem>
                    <CarouselItem>Goat</CarouselItem>
                    <CarouselItem>Lamb</CarouselItem>
                    <CarouselItem>Pasta</CarouselItem>
                    <CarouselItem>Pork</CarouselItem>
                    <CarouselItem>Seafood</CarouselItem>
                    <CarouselItem>Side</CarouselItem>
                    <CarouselItem>Starter</CarouselItem>
                    <CarouselItem>Vegan</CarouselItem>
                    <CarouselItem>Vegetarian</CarouselItem>
                    <CarouselItem>Misc</CarouselItem>
                </Carousel>
                <FoodGrid></FoodGrid>
            </div>
        );
    }
}