import React from "react";
import { useNavigate } from "react-router-dom";

const Home=()=> {
    const navigate = useNavigate();
    return (
        <div className="center-box">
            <h1>Welcome to my recipe book</h1>
            <button onClick = {() => navigate ('/recipes')}>view recipes </button>
        </div>
    );
}
export default Home