import ViewObject from '../ViewObject/ViewObject';
import React, {Component} from 'react';
import './Login.css';

export default class Login extends Component{


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
                <div className="form">
                    <h1>LOGIN</h1>
                    <input placeholder="username"></input>
                    <br/>
                    <input placeholder="password"></input>
                    <br/><br/>
                    <button>login</button>
                    <br/><br/>
                    <text>Not registered? </text><a href="/signup">Sign Up</a>
                </div>
                <div className="object">
                    <canvas ref={this.canvasRef} />
                </div>
            </div>
        );
    }
}