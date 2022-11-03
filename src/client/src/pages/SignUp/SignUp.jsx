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
            profilePicture: '',
          };
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        var md5 = require('md5');
        this.state.password = md5(this.state.password);
        fetch('https://newpantry.herokuapp.com/api/signup', {
            method: 'POST',redirect: 'follow',
            body: JSON.stringify(this.state),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
            console.log(res)
            window.location.href = "https://newpantry.herokuapp.com/login" ;
            } else {
            const error = new Error(res.error);
            console.log(error)
            throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    }

    // ******************* COMPONENT LIFECYCLE ******************* //
    // componentDidMount() {
    //     // Get canvas, pass to custom class
    //     const canvas = this.canvasRef.current;
    //     this.viewOjbect = new ViewObject(canvas);

    //     // Init any event listeners
    //     window.addEventListener('mousemove', this.mouseMove);
    //     window.addEventListener('resize', this.handleResize);
    // }

    // // ******************* EVENT LISTENERS ******************* //
    // mouseMove = (event) => {
    //     this.viewOjbect.onMouseMove(event);
    // }

    // handleResize = () => {
    //     this.viewOjbect.onWindowResize(window.innerWidth, window.innerHeight);
    // };

    render(){
        // Forgot password, e-mail verification
        return(
            <div className="signupDiv">
                <h1>SIGN UP</h1>
                <form className="formSU" onSubmit={this.onSubmit}>
                    <img src="/profileImages/one.png" alt="profile" value={this.state.profilePicture}></img>
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
                {/* <div className="objectSU">
                    <canvas ref={this.canvasRef} />
                </div> */}
            </div>
        );
    }
}