import React, {Component} from 'react';
import './Favorites.css';


export default class LandingPage extends Component{

    render(){
        return(
            <div className='landing'>
                <div className="nav-bar">
                    <img src="/Pantry.png" alt="pantry icon"/>
                    <a href="/home">Home</a>
                    <a href="/favorites" id="active">Favorites</a>
                    <div className="search-bar">
                        <input></input>
                    </div>
                </div>
            </div>
        );
    }
}