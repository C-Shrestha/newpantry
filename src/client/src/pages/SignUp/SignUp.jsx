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
            profilePicture: '1.png',
          };
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    
    onSubmit = async (event) => {
        event.preventDefault();
        var md5 = require('md5');
        this.state.password = md5(this.state.password); 
        const URL = 'https://newpantry.herokuapp.com/api/signup';
        const body = JSON.stringify({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, profilePicture: this.state.profilePicture});
        try{
            const response = await fetch(URL, {
                method: 'POST',
                body: body,
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            console.log(json);
            const token = response.headers.get("Authorization");
            console.log(token);
        } catch (error){
            console.log(error.response);
            console.error(error);
        };
    } 

    changeProfilePictureRight(){
        var curPicture = document.getElementById("profile-img");
        var curPicIdx = curPicture.src[(curPicture.src.length - 5)];
        if(curPicIdx == 6){
            curPicIdx = 1;
        }
        else{
            curPicIdx++;
        }
        var newSrc = curPicture.src.substring(0, curPicture.src.length-5) + curPicIdx + curPicture.src.substring(curPicture.src.length-4);
        curPicture.src = newSrc;
    }

    changeProfilePictureLeft(){
        var curPicture = document.getElementById("profile-img");
        var curPicIdx = curPicture.src[(curPicture.src.length - 5)];
        if(curPicIdx == 1){
            curPicIdx = 6;
        }
        else{
            curPicIdx--;
        }
        var newSrc = curPicture.src.substring(0, curPicture.src.length-5) + curPicIdx + curPicture.src.substring(curPicture.src.length-4);
        curPicture.src = newSrc;
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
                    <img id="profile-img" src="/profileImages/1.png" alt="profile" value="1.png"></img>
                    <button type="button" class="btn">
                        <FontAwesomeIcon class="caretBtn" icon={faCaretRight} onClick={this.changeProfilePictureRight}/>
                    </button>
                    <br/>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        required
                    />
                    <br/>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="last name"
                        value={this.state.lastName}
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
