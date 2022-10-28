import React, {Component} from 'react';
import './HomePage.css';


export default class LandingPage extends Component{

    render(){
        return(
            <div className='landing'>
                <div className="nav-bar">
                    <img src="/PantryHorizontal.png" alt="pantry icon"/>
                    <a href="/home" id="active">Home</a>
                    <a href="/favorites">Favorites</a>
                    <div className="search-bar">
                        <input></input>
                    </div>
                </div>
            </div>
        );
    }
}