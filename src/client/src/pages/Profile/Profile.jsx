import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import SearchGrid from '../../components/SearchGrid';
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
                firstName: localStorage.getItem('fname-info'),
                lastName: localStorage.getItem('lname-info'),
                password: localStorage.getItem('pass-info'),
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

     /* limit input to only letters */
     handleAplaChange = (event) => {
        const val = event.target.value.replace(/[^a-z]/gi, '');
        const name = event.target.name;
        this.setState({
            [name]: val
          });
    }

    setVal = (event) => {
        var foodGrid = document.getElementById("food");
        var searchGrid = document.getElementById("searching");
        if(event.key === 'Enter'){
            foodGrid.style.display = 'none';
            searchGrid.style.display = 'block';
            const sendValue = this.state.searchValue;
            this.setState({
                sendValue
            });
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        var password = this.state.password;
        var regex = /^[^]{8,16}$/;
        if (regex.test(password) === false) {
            var span = document.getElementById("errorSpan");
            span.style.color = "#E54829";
            span.innerHTML = "Password must be minimum 8 characters";
            return;
        }
        var md5 = require('md5');
        var hashedPassword = md5(password);
        const URL = 'https://newpantry.herokuapp.com/api/editProfile';
        const body = JSON.stringify({email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, password: hashedPassword});
        try{
            await fetch(URL , {
                method: 'POST',
                body: body,
                headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
                },
            }).then(
                async (response) => { 
                var json = "";
                var span = document.getElementById("errorSpan");
                if(response.status === 404){
                    span.style.color = "#E54829";
                    span.style.marginLeft = '-10%';
                    span.innerHTML = "Invalid email"; 
                }
                else if(response.status === 200){
                    json = await response.json();
                    localStorage.setItem('pass-info', this.state.password);
                    span.style.color = '#A5BA78';
                    span.style.marginLeft = '-10%';
                    span.innerHTML = "Profile Updated";
                    setTimeout(function(){
                        span.innerHTML = '';
                    }, 3000);
                }
                return json;
            }).then(function(data){
                localStorage.setItem('fname-info', data.firstName);
                localStorage.setItem('lname-info', data.lastName);
            });
        } catch (error){
            console.log(error);
        };
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
            <div className="div">
                <div className='landing'>
                    <div className="nav-bar">
                        <div><a href="/">
                            <img class ="pantry-pic" src="/PantryHorizontal.png" alt="pantry icon"/>    
                        </a></div>
                        <div className="li"><a class="links" href="/home">Home</a></div>
                        <div className="li"><a class="links" href="/favorites">Favorites</a></div>
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
                </div>
                <div id="food">
                    <div className="profileDiv">
                        <form className="formPR" onSubmit={this.onSubmit}>
                        <h2 id="errorSpan"></h2>
                            <input
                                id="edit1"
                                type="text"
                                name="firstName"
                                placeholder="first name"
                                value={this.state.firstName}
                                onChange={this.handleAplaChange}
                                required
                            />
                            <br/>
                            <input
                                id="edit2"
                                type="text"
                                name="lastName"
                                placeholder="last name"
                                value={this.state.lastName}
                                onChange={this.handleAplaChange}
                                required
                            />
                            <br/>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={this.state.email}
                                disabled
                            />
                            <br/>
                            <input
                                id="edit3"
                                type="password"
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                required
                            />
                            <br/><br/>
                            <input id="submit" type="submit" value="Edit Profile"/>
                        </form>
                    </div>
                </div>
                <div id="searching">
                    <SearchGrid value={this.state.sendValue}></SearchGrid>
                </div>
                
            </div>
        );
    }
}
