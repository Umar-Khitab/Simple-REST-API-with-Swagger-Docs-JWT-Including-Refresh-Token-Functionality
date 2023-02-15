import Login from "./pages/Login";
import Register from "./pages/Register";
// import axios from "axios";
// import {useState, useEffect} from 'react'
import Header from "./components/Header";
import Home from "./pages/Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  
  return (
    <div className="App">
      <Header/>
       <BrowserRouter>
      <Routes>
       <Route path='/task' element={<Home/>} />
       <Route path='/auth/login' element={ <Login/>} />
       <Route path='/auth/signup' element={<Register/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
