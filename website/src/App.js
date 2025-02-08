import React from 'react';
import './App.css';
import LoginForm from './Components/LoginForm';
//import Main from './Components/Main';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import AddRecipeForm from './Components/AddRecipeForm';
import RegistrationForm from './Components/RegistrationForm';
import RecipeList from './Components/RecipeList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';





const App= () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add-recipe" element={<AddRecipeForm />} />
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </Router>

  );
};

export default App;
