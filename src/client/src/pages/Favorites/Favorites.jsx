import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';
import './Favorites.css';


export default class FavoritesPage extends Component{


    favoritesButton(){
        var animationBubble = document.getElementById("animationBubble");
        var favorites = document.getElementById("favorites");
        var pantry = document.getElementById("pantry");
        animationBubble.style.transform = "translateX(-98px)";
        favorites.style.marginLeft = `25%`;
        pantry.style.marginLeft = `110%`;
    }

    pantryButton(){
        var animationBubble = document.getElementById("animationBubble");
        var favorites = document.getElementById("favorites");
        var pantry = document.getElementById("pantry");
        animationBubble.style.transform = "translateX(98px)";
        favorites.style.marginLeft = `-60%`;
        pantry.style.marginLeft = `30%`;
    }


    render(){
        return(
            <div className='landing'>
                <div className="nav-bar">
                    <a href="/">
                        <img class ="pantry-pic" src="/PantryHorizontal.png" alt="pantry icon"/>    
                    </a>
                    <a class="links" href="/home">Home</a>
                    <a class="links" href="/favorites" id="active">Favorites</a>
                    <div className="search-bar">
                        <FontAwesomeIcon class="search-pic" icon={faMagnifyingGlass} />
                        <input></input>
                    </div>
                </div>
                <div className="select">
                    <div className="animationBubble" id="animationBubble">
                        <div className="favorites" id="favorites">
                            <button onClick={this.favoritesButton}>FAVORITES</button>
                        </div>
                        <div className="pantry" id="pantry">
                            <button onClick={this.pantryButton}>PANTRY</button>
                        </div>
                    </div>
                    <div className="profile">
                        <FontAwesomeIcon class="profile-pic" icon={faUser} />
                    </div>
                </div>
            </div>
        );
    }
}