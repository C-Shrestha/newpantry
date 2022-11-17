import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';
import './Profile.css';

export default class Profile extends Component{

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
                fname: localStorage.getItem('fname-info'),
                lname: localStorage.getItem('lname-info'),
                pass: localStorage.getItem('pass-info')
            };
        }
    }


    render(){
        return(
            <div className="div">
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
                </div>
                <div className="profileDiv">
                    <form className="formPR" onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="first name"
                            value={this.state.fname}
                            onChange={this.handleInputChange}
                            required
                        />
                        <br/>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="last name"
                            value={this.state.lname}
                            onChange={this.handleInputChange}
                            required
                        />
                        <br/>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required
                        />
                        <br/>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value=""
                            onChange={this.handleInputChange}
                            required
                        />
                        <br/><br/>
                        <input id="submit" type="submit" value="Edit Profile"/>
                    </form>
                </div>
            </div>
        );
    }
}
