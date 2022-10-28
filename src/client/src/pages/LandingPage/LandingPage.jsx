import React, {Component} from 'react';
import './LandingPage.css';


export default class LandingPage extends Component{

    render(){
        return(
            <div className='landing'>
                <img src="/Pantry.png" alt="pantry icon"/>
                <a class="btn" type="button" href="/login">&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;</a>
            </div>
        );
    }
}