import { faMagnifyingGlass, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import SearchGrid from '../../components/SearchGrid';
import PantryGrid from '../../components/PantryGrid';
import FavGrid from '../../components/FavGrid';
import React, {Component} from 'react';
import './Favorites.css';


export default class FavoritesPage extends Component{

    constructor(props){
        super(props);
        if(localStorage.getItem('token-info') == null){
            window.location.href = "https://newpantry.herokuapp.com"
        }
        else{
            this.state = {
                token: localStorage.getItem('token-info'),
                email: localStorage.getItem('email-info'),
                profilePicture: localStorage.getItem('picture-info'),
                searchValue: '',
                sendValue: 'none'
            };
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }

    setVal = (event) => {
        var foodGrid = document.getElementById("food");
        var searchGrid = document.getElementById("searching");
        var linkColor = document.getElementById("active");
        if(event.key === 'Enter'){
            foodGrid.style.display = 'none';
            searchGrid.style.display = 'block';
            linkColor.style.color = '#848484';
            const sendValue = this.state.searchValue;
            this.setState({
                sendValue
            });
        }
    }

    add = async () =>{
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

    hideIcon(){
        var search = document.getElementById("search");
        search.style.visibility = "hidden";
    }
    showIcon(){
        var search = document.getElementById("search");
        search.style.visibility = "visible";
    }

    logOut(){
        localStorage.removeItem('token-info');
        localStorage.removeItem('email-info');
        localStorage.removeItem('pass-info');
        localStorage.removeItem('fname-info');
        localStorage.removeItem('lname-info');
        localStorage.removeItem('picture-info');
        window.location.reload();
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
                        <input onMouseEnter={this.hideIcon} onMouseLeave={this.showIcon} name="searchValue" value={this.state.searchValue}
                         onChange={this.handleInputChange} onKeyPress={this.setVal}/>
                    </div>
                    <div className="li">
                        <div className="dropdown">
                            <button class="dropbtn">
                                <img class="profile-pic" src={this.state.profilePicture} alt="profile pic"/>
                            </button>
                            <div class="dropdown-content">
                                <a href="/profile" id="profile">Profile</a>
                                <a onClick={this.logOut} id="logout">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="food">
                    <div className="select">
                        <div className="animationBubble" id="animationBubble"></div>
                        <button class="toggle" onClick={this.favoritesButton}>FAVORITES</button>
                        <button class="toggle" onClick={this.pantryButton}>PANTRY</button>
                    </div>
                    <div className="pantry" id="pantry">
                        <PantryGrid></PantryGrid>
                    </div>
                    <div className="favorites" id="favorites">
                        <FavGrid></FavGrid>
                    </div>
                </div>
                <div id="searching">
                    <SearchGrid value={this.state.sendValue}></SearchGrid>
                </div>
            </div>
        );
    }
}
