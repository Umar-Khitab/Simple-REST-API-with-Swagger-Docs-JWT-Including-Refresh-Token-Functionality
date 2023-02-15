import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const Login = () => {
     const [username, setUsername] =useState('')
     const [password, setPassword] =useState('')
     const [navigate, setNavigate] =useState(false)
     const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
       event.preventDefault();
       const res = await axios.post('http://localhost:5000/auth/login',
      {username,password}
      ,
      {withCredetials: true});

   //_______Get Token from Response Data________
       const {refreshToken, accessToken} = res.data;

       Cookies.set('refreshToken', refreshToken, { expires: 7 });
       
       const expirationDate = new Date(Date.now() + 360 * 1000);
       Cookies.set('accessToken', accessToken, {expires: expirationDate});
       
       if(res.status == 200){
        setNavigate(true)
      }
   }
     
    
    if(navigate){
       return <Navigate to="/task"/>
    }
    return (
     <div className='container p-5 mx-5'>
       <Container>
        <Col xs={4} md={4}>
        </Col>
        <Col xs={4} md={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Label className="Lead fs-3 fw-bold mb-4">Login</Form.Label>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
          className="mb-3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
    
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Login
       </Button>
        </Form>
        </Col>
        <Col xs={4} md={4}></Col>
      </Container>
     </div>
    )
  }

export default Login