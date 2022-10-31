import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';
import './Favorites.css';


export default class FavoritesPage extends Component{

    render(){
        return(
            <div className='landing'>
                <div className="nav-bar">
                    <img class ="pantry-pic" src="/PantryHorizontal.png" alt="pantry icon"/>
                    <a href="/home">Home</a>
                    <a href="/favorites" id="active">Favorites</a>
                    <div className="search-bar">
                        <FontAwesomeIcon class="search-pic" icon={faMagnifyingGlass} />
                        <input></input>
                    </div>
                </div>
                <div className="select">
                    <div className="favorites">

                    </div>
                    <div className="pantry">

                    </div>
                    <div className="profile">
                        
                    </div>
                </div>
            </div>
        );
    }
}