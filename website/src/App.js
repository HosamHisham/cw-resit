import React from 'react';
import './App.css';
import LoginForm from './Components/LoginForm';
import Main from './Components/Main';
import Home from './Components/Home';
import RegistrationForm from './Components/RegistrationForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';





const App= () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>

  );
};

export default App;
