import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios'
import { Navigate } from 'react-router-dom';


const Register = () => {
     const [username, setUsername] =useState('')
     const [email, setEmail] =useState('')
     const [password, setPassword] =useState('')
     const [navigate, setNavigate] = useState(false)
     const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const res = await axios.post('http://localhost:5000/auth/signup', {
        username,email,password
      })
    
      if(res.status == 200){
        setNavigate(true)
        }
    }
      if(navigate){
         return <Navigate to="/auth/login"/>}

    return (
     <div className='container p-5 mx-5'>
       <Container>
        <Col xs={4} md={4}></Col>
        <Col xs={4} md={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Label className="Lead fs-3 fw-bold mb-4">Register</Form.Label>
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

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
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
        Register
      </Button>
        </Form>
        </Col><Col xs={4} md={4}></Col>
    </Container>
     </div>
    )
  }

export default Register