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
            await fetch(URL, {
                method: 'POST',
                body: body,
                headers: {
                'Content-Type': 'application/json'
                },
            }).then(
                async (response) => { 
                var json = "";
                var span = document.getElementById("errorSpan");
                if (response.status === 401){
                    span.style.color = "#E54829";
                    span.innerHTML = "Invalid password";
                    console.log("Invalid password");
                }
                else if(response.status === 404){
                    span.style.color = "#E54829";
                    span.innerHTML = "Invalid email";
                    console.log("Invalid email");
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
        event.preventDefault();
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
            console.log(response);
            var span = document.getElementById("errorSpan");
            if(response.status === 200){
                span.style.color = "#A5BA78";
                span.innerHTML = "Recovery email sent<br/>Please check your email"; 
            }
            else if (response.status === 404){
                span.style.color = "#E54829";
                span.innerHTML = "Email not found";
                console.log("Email not found"); 
            }
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
                <div className="loginForm">
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
                        <h2 className="pass" onClick={this.forgotPass}>Forgot Password?</h2>
                        <br/><br/>
                        <input type="submit" value="login"/>
                        <br/><br/>
                        <text>Not registered? </text><a href="/signup">Sign Up</a>
                    </form>
                    {/* <button onClick={this.forgotPass} className="pass">Forgot Password?</button> */}
                </div>
                <div className="object">
                    <canvas ref={this.canvasRef} />
                </div>
            </div>
        );
    }
}
