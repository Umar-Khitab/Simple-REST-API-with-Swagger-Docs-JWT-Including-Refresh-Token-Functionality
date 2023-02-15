import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Table} from 'react-bootstrap'
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

 
 
  const GenerateRefreshToken = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/refresh',
      {}, 
      { headers: { token:`Bearer ${refreshToken}`}
    });
    return res.data; 
    } catch (err) {
      console.log(err);
    }
  };
 

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken) {
        const data = await GenerateRefreshToken();
        Cookies.set('accessToken', accessToken)
      }
      return config;
      },
        (error) => {
      return Promise.reject(error);
    }
  );
  setInterval(refreshToken, 5 * 60 * 1000);

  useEffect(() => {
    (async () => {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };
  
      setAccessToken(getCookie('accessToken'));
      setRefreshToken(getCookie('refreshToken'));
       const res = await axiosJWT.get('http://localhost:5000/task', { headers: { token:`Bearer ${accessToken}`}})
        if(res.status == 200){
          setTasks(res.data);
        }else{
         console.log(error);}
       
        }
        )();
      },[accessToken, refreshToken]);
  
  
  const taskList = tasks.map(task => (
    <tr key={task._id}>
      <td>{task.task}</td>
      <td>{task.assignee}</td>
      <td>{task.status}</td>
    </tr>));

  return (
    <Container className='mt-5'>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Task</th>
          <th>Assignee</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {taskList}
      </tbody>
    </Table>
    </Container>
  );
  
}

export default Home