import ViewObject from '../ViewObject/ViewObject';
import React, {Component} from 'react';
import './Login.css';

export default class Login extends Component{
      
      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }
    
      onSubmit = (event) => {

        event.preventDefault();
        fetch('https://newpantry.herokuapp.com/api/login', {
          method: 'POST',redirect: 'follow',
          body: JSON.stringify(this.state),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res)
            window.location.href = "https://newpantry.herokuapp.com/home" ;
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
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            email : '',
            password: ''
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
                    <input type="submit" value="submit"/>
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