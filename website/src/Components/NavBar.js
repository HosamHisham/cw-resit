import './NavBar.css'
import React from 'react';
import {useNavigate} from 'react-router-dom';

const NavBar=() => {
    const navigate = useNavigate();

    return (
        <nav>
            <div className="logo" onClick={() => navigate ('/home')}>
                cook book
            </div>
            <div>
                <ul>
                    <li onClick={() => navigate('/login')}>login</li>
                    <li onClick={() => navigate('/register')}>register</li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;

/*
const NavBar=({navigate})=>{
    return(
        <nav>
            <div className="logo" onClick={()=>{
                navigate('home')
            }}>
            cook book
        </div>
        <div>
            <ul>
                <li onClick={()=>{
                    navigate('login');
                }}>login</li>
                <li onClick={()=>{
                    navigate('register');
                }}>register</li>
            </ul>
        </div>
        </nav>
    );
}
export default NavBar;
*/