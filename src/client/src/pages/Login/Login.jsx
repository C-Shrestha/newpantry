import ViewObject from '../ViewObject/ViewObject';
import React, {Component} from 'react';
import './Login.css';

export default class Login extends Component{
    
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            email: '',
            password: '',
            profilePicture: ''
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
        var hashedPassword = md5(this.state.password);
        const URL = 'https://newpantry.herokuapp.com/api/login';
        const body = JSON.stringify({email: this.state.email, password: hashedPassword});
        try{
            const response = await fetch(URL, {
                method: 'POST',
                body: body,
                headers: {
                'Content-Type': 'application/json'
                },
            }).then(
                async (response) => { 
                var json = "";
                if (response.status === 400){
                    var span = document.getElementById("errorSpan");
                    span.innerHTML = "Invalid email or password";
                    console.log("Invalid email or password");
                }
                else if(response.status === 401){
                    var span = document.getElementById("errorSpan");
                    span.innerHTML = "User email not verified";
                    console.log("User email not verified");
                }
                else if(response.status === 200){
                    json = await response.json();
                    const token = response.headers.get("Authorization");
                    localStorage.setItem('token-info', token);
                    localStorage.setItem('email-info', this.state.email);
                    localStorage.setItem('pass-info', this.state.password);
                    console.log(token);
                    window.location.href = "https://newpantry.herokuapp.com/home";
                    
                }
                return json;
            }).then(function(data){
                localStorage.setItem('fname-info', data.firstName);
                localStorage.setItem('lname-info', data.lastName);
                localStorage.setItem('picture-info', data.profilePicture);
                
            });
        } catch (error){
            console.log(error);
        };
    } 

    forgotPass = async (event) => {
        console.log("here");
        event.preventDefault();

        const URL1 = 'https://newpantry.herokuapp.com/api/users';
        const body1 = JSON.stringify({email: this.state.email});
        console.log(body1);
        try{
            const response = await fetch(URL1, {
                method: 'POST',
                body: body1,
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const json = await response.json();    
            console.log(json);

        } catch (error){
            console.log(error);
        }; 

        var email = this.state.email;
        const URL = 'https://newpantry.herokuapp.com/api/forgotPass';
        const body = JSON.stringify({email: email});
        console.log(body);
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

        } catch (error){
            console.log(error);
        }; 
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
            <div className="loginDiv">
                <form className="form" onSubmit={this.onSubmit}>
                    <h1>LOGIN</h1>
                    <h2 id="errorSpan"></h2>
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
                    <input type="submit" value="login"/>
                    <br/><br/>
                    <text>Not registered? </text><a href="/signup">Sign Up</a>
                </form>
                <button onClick={this.forgotPass} className="pass">Forgot Password?</button>
                <div className="object">
                    <canvas ref={this.canvasRef} />
                </div>
            </div>
        );
    }
}
