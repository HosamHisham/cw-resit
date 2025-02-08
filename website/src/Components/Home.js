import React from "react";
import { useNavigate } from "react-router-dom";

const Home=()=> {
    const navigate = useNavigate();
    return (
        <h1>Welcome to my recipe book</h1>
        <button onClick = {() => navigate (/addrecipe)> </button>
    );
}
export default Home