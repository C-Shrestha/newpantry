import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import axios from "axios";

export default function SignUp2() {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [signup, setSigup] = useState(false);


    // const axios = require('axios');
    const handleSubmit = (e) => {
       console.log(email)
       console.log(password)
    // set configurations
        // const configuration = {
        //     method: "post",
        //     url: "https://newpantry.herokuapp.com/api/login",
        //     body: {
        //     email,
        //     password,
        //     },
        // };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };
        console.log(requestOptions)
        fetch('https://newpantry.herokuapp.com/api/login', requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data)})
        .catch(error => {console.log(error)});


        // fetch('http://www.themealdb.com/api/json/v1/1/search.php?f=')
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => {console.log(error)});

        // console.log(configuration) http://127.0.0.1:5000/api/login
        // axios(configuration)
        // .then((response) => {console.log(response);})
        // .catch((error) => {console.log(error);})

    //     try{
    //         const response = await axios.get('/api/users');
    //         console.log('response  ', response)
    //         return response.data;
    //     }catch(error) {
    //         return [];
    //     }
     }
    return (
        
        <>
        <h2>Sign Up</h2>
        <Form >
        {/* first name */}
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="fname"
            name="fname"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            placeholder="Enter first name"
          />
        </Form.Group>
        {/* last name */}
        <Form.Group controlId="formLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="lname"
            name="lname"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            placeholder="Enter last name"
          />
        </Form.Group>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        {/* confirm password */}
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          SignUp
        </Button>
      </Form>
        </>
    )
}