import ViewObject from '../ViewObject/ViewObject';
import React, {Component} from 'react';
import './Login.css';

export default class Login extends Component{
    
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            email: '',
            password: ''
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
        const URL = 'https://newpantry.herokuapp.com/api/login';
        const body = JSON.stringify({email: this.state.email, password: this.state.password});
        try{
            const response = await fetch(URL, {
                method: 'POST',
                body: body,
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const token = response.headers.get("Authorization");
            document.cookie = token + " "+ this.state.email;
            window.location.href = "https://newpantry.herokuapp.com/home";
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
                <div className="object">
                    <canvas ref={this.canvasRef} />
                </div>
            </div>
        );
    }
}
