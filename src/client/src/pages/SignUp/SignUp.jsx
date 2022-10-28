import ViewObject from '../ViewObject/ViewObject';
import React, {Component} from 'react';
import './SignUp.css';

export default class SignUp extends Component{

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
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
                <div className="formSU">
                    <h1>SIGN UP</h1>
                    <input placeholder="first name"></input>
                    <br/>
                    <input placeholder="last name"></input>
                    <br/>
                    <input placeholder="e-mail"></input>
                    <br/>
                    <input placeholder="password"></input>
                    <br/>
                    <input placeholder="confirm password"></input>
                    <br/><br/>
                    <button>signup</button>
                    <br/><br/>
                    <text>Already Registered? </text><a href='/login'>Login</a>
                </div>
                <div className="object">
                    <canvas ref={this.canvasRef} />
                </div>
            </div>
        );
    }
}