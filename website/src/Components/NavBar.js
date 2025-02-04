import './NavBar.css'
import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const NavBar=() => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user')
        setIsLoggedIn(!!user);
    }, [location.pathname]);


    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login')
    };

    return (
        <nav>
            <div className="logo" onClick={() => navigate ('/home')}>
                cook book
            </div>
            <div>
                <ul>
                    {isLoggedIn ? (
                        <li onClick={handleLogout}>Logout</li>
                    ) : (
                    <>
                    <li onClick={() => navigate('/login')}>login</li>
                    <li onClick={() => navigate('/register')}>register</li>
                    </>
                    )}
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