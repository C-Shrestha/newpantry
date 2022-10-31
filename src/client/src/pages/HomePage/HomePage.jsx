import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import Carousel, { CarouselItem } from "../../components/Carousel";
import React, {Component} from 'react';
import './HomePage.css';


export default class HomePage extends Component{

    render(){
        return(
            <div className='landing'>
                <div className="nav-bar">
                    <a href="/">
                        <img class ="pantry-pic" src="/PantryHorizontal.png" alt="pantry icon"/>    
                    </a>
                    <a class="links" href="/home" id="active">Home</a>
                    <a class="links" href="/favorites">Favorites</a>
                    <div className="search-bar">
                        <FontAwesomeIcon class="search-pic" icon={faMagnifyingGlass} />
                        <input></input>
                    </div>
                </div>
                <div className="carousel">
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
                </div>
                <div className="seasonal">

                </div>
                <div className="trending">
                    
                </div>
            </div>
        );
    }
}