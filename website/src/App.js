import React from 'react';
import './App.css';
import LoginForm from './Components/LoginForm';
import Main from './Components/Main';
import Home from './Components/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



const App= () => {
  return (
    <router>
      <routes>
        <route path="/" element={<Main />} />
        <route path="/home" element={<Home />} />
        <route path="/login" element={<LoginForm />} /> 
      </routes>
    </router>

  );
}

export default App;
