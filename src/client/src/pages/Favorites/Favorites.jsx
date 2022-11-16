import { faMagnifyingGlass, faUser, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';
import FavGrid from "../../components/FavGrid"
import './Favorites.css';


export default class FavoritesPage extends Component{

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

    add = async () =>{
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
        } catch (error){
            console.log(error);
        }; 

    }

    favoritesButton(){
        // Move the div pill to hover over page that is currently enabled (favorites)
        var animationBubble = document.getElementById("animationBubble");
        animationBubble.style.left = "37.5%";

        // Display favorites div and hide pantry div to only show the favorites page of material
        var favoritesDiv = document.getElementById("favorites");
        var pantryDiv = document.getElementById("pantry");

        favoritesDiv.style.visibility = "visible";
        pantryDiv.style.visibility = "hidden";
    }

    pantryButton(){
        // Move the div pill to hover over page that is currently enabled (pantry)
        var animationBubble = document.getElementById("animationBubble");
        animationBubble.style.left = "50%";

        // Display pantry div and hide favorites div to only show the pantry page of material
        var favoritesDiv = document.getElementById("favorites");
        var pantryDiv = document.getElementById("pantry");

        favoritesDiv.style.visibility = "hidden";
        pantryDiv.style.visibility = "visible";
    }

    render(){
        return(
            <div className='landing'>
                <div className="nav-bar">
                    <div><a href="/">
                        <img class ="pantry-pic" src="/PantryHorizontal.png" alt="pantry icon"/>    
                    </a></div>
                    <div className="li"><a class="links" href="/home">Home</a></div>
                    <div className="li"><a class="links" href="/favorites"id="active">Favorites</a></div>
                    <div className="li" >
                        <FontAwesomeIcon className="search-pic" id="search" icon={faMagnifyingGlass}/>
                        <input onMouseEnter={this.hideIcon} onMouseLeave={this.showIcon}></input>
                    </div>
                    <div className="li">
                        <FontAwesomeIcon class="profile-pic" icon={faUser} />
                    </div>
                </div>
                <div className="select">
                    <div className="animationBubble" id="animationBubble"></div>
                    <button class="toggle" onClick={this.favoritesButton}>FAVORITES</button>
                    <button class="toggle" onClick={this.pantryButton}>PANTRY</button>
                </div>
                <div className="pantry" id="pantry">
                    <div className="top-bar">
                        <h1>My Pantry</h1>
                        <FontAwesomeIcon class="plus-pic" icon={faCirclePlus} />
                    </div>
                    <div className="items">
                        <table>
                            <tr>
                                <td>can of tomatoes 1</td>
                                <td>can of tomatoes 2</td>
                            </tr>
                            <tr>
                                <td>can of tomatoes 3</td>
                                <td>can of tomatoes 4</td>
                            </tr>
                            <tr>
                                <td>can of tomatoes 5</td>
                                <td>can of tomatoes 6</td>
                            </tr>
                            <tr>
                                <td>can of tomatoes 7</td>
                                <td>can of tomatoes 8</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="favorites" id="favorites">
                    <FavGrid></FavGrid>
                </div>
            </div>
        );
    }
}
