import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ViewObject from '../ViewObject/ViewObject';
import React, {Component} from 'react';
import './SignUp.css';

export default class SignUp extends Component{

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            profilePicture: 'https://i.imgur.com/cEw6FVg.png',
          };
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
    
    onSubmit = async (event) => {
        var password = this.state.password;
        var regex = /^[^]{8,16}$/;
        if (regex.test(password) === false) {
            var span = document.getElementById("errorSpanSU");
            span.style.color = "#E54829";
            span.innerHTML = "Password must be 8 characters";
            event.preventDefault();
            return;
        }
        event.preventDefault();
        var md5 = require('md5');
        var hashedPassword = md5(password);
        const URL = 'https://newpantry.herokuapp.com/api/signup';
        const body = JSON.stringify({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: hashedPassword, profilePicture: this.state.profilePicture});
        try{
            await fetch(URL, {
                method: 'POST',
                body: body,
                headers: {
                'Content-Type': 'application/json'
                },
            }).then((response) => {
                var span = document.getElementById("errorSpanSU"); 
                if (response.status === 409){ 
                    span.style.color = '#E54829';
                    span.innerHTML = "User already exists";
                    console.log("User already exists");
                }
                else if (response.status === 503){
                    span.style.color = '#E54829';
                    span.innerHTML = "Failed to create user";
                    console.log("Failed to create user");
                }
                else if (response.status === 404){
                    span.style.color = '#E54829';
                    span.innerHTML = "Could not search for user";
                    console.log("Could not search for user"); 
                }
                else if (response.status === 200){
                    span.style.color = '#A5BA78';
                    span.innerHTML = "User created <br/>Please confirm email address";
                    console.log("User created - please confirm new user's email address");
                }
            });
        } catch (error){
            console.error(error);
        };
    } 

    changeProfilePictureRight = () => {
        var curPicture = document.getElementById("profile-img");
        var newSrc;
        switch(curPicture.src){
            case 'https://i.imgur.com/KxMOJIP.png':
                newSrc = 'https://i.imgur.com/cEw6FVg.png';
                break;
            case 'https://i.imgur.com/sCjPtpC.png':
                newSrc = 'https://i.imgur.com/KxMOJIP.png';
                break;
            case 'https://i.imgur.com/AeHX704.png':
                newSrc = 'https://i.imgur.com/sCjPtpC.png';
                break;
            case 'https://i.imgur.com/JMhY6zW.png':
                newSrc = 'https://i.imgur.com/AeHX704.png';
                break;
            case 'https://i.imgur.com/Ak6Q5eK.png':
                newSrc = 'https://i.imgur.com/JMhY6zW.png';
                break;
            case 'https://i.imgur.com/cEw6FVg.png':
                newSrc = 'https://i.imgur.com/Ak6Q5eK.png';
                break;
            default:
                newSrc = 'https://i.imgur.com/cEw6FVg.png';
                break;
        }
        curPicture.src = newSrc;
        this.setState({
            profilePicture: newSrc
        });
    }

    changeProfilePictureLeft = () => {
        var curPicture = document.getElementById("profile-img");
        var newSrc;
        switch(curPicture.src){
            case 'https://i.imgur.com/Ak6Q5eK.png':
                newSrc = 'https://i.imgur.com/cEw6FVg.png';
                break;
            case 'https://i.imgur.com/cEw6FVg.png':
                newSrc = 'https://i.imgur.com/KxMOJIP.png';
                break;
            case 'https://i.imgur.com/KxMOJIP.png':
                newSrc = 'https://i.imgur.com/sCjPtpC.png';
                break;
            case 'https://i.imgur.com/sCjPtpC.png':
                newSrc = 'https://i.imgur.com/AeHX704.png';
                break;
            case 'https://i.imgur.com/AeHX704.png':
                newSrc = 'https://i.imgur.com/JMhY6zW.png';
                break;
            case 'https://i.imgur.com/JMhY6zW.png':
                newSrc = 'https://i.imgur.com/Ak6Q5eK.png';
                break;
            default:
                newSrc = 'https://i.imgur.com/cEw6FVg.png';
                break;
        }
        curPicture.src = newSrc;
        this.setState({
            profilePicture: newSrc
        });
    }

    // ******************* COMPONENT LIFECYCLE ******************* //
    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.viewOjbect = new ViewObject(canvas);

        // Init any event listeners
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('resize', this.handleResize);
    }

    // ******************* EVENT LISTENERS ******************* //
    mouseMove = (event) => {
        this.viewOjbect.onMouseMove(event);
    }

    handleResize = () => {
        this.viewOjbect.onWindowResize(window.innerWidth, window.innerHeight);
    };

    render(){
        // Forgot password, e-mail verification
        return(
            <div className="signupDiv">
                <h1>SIGN UP</h1>
                <form className="formSU" onSubmit={this.onSubmit}>
                    <button type="button" class="btn">
                        <FontAwesomeIcon class="caretBtn" icon={faCaretLeft} onClick={this.changeProfilePictureLeft}/>
                    </button>
                    <img id="profile-img" src="https://i.imgur.com/cEw6FVg.png" alt="profile"></img>
                    <button type="button" class="btn">
                        <FontAwesomeIcon class="caretBtn" icon={faCaretRight} onClick={this.changeProfilePictureRight}/>
                    </button>
                    <br/><br/>
                    <h2 id="errorSpanSU"></h2>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        value={this.state.firstName}
                        onChange={this.handleAplaChange}
                        required
                    />
                    <br/>
                    <input
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
                        onChange={this.handleInputChange}
                        required
                    />
                    <br/>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                    />
                    <br/><br/>
                    <input type="submit" value="sign up"/>
                    <br/><br/>
                    <text>Already Registered? </text><a href='/login'>Login</a>
                </form>
                <div className="objectSU">
                    <canvas ref={this.canvasRef} />
                </div>
            </div>
        );
    }
}
