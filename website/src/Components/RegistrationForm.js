import React from 'react';
import {useState} from 'react';


const RegistrationForm = () => {
    const [name, setName] = useState ('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] =useState('');

    const registerUser = () => {
        fetch ('http://localhost:5000/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, isAdmin}),
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Registration failed');
                }
                setMessage = 'Registration successful';
                alert('Registartion Succesful');
            })
            .catch((error) => {
                setMessage(error.message);
                alert(error.message);
            });
        
    };
    return (
        <div className="form-selection">
            <h3>User Registration</h3>
            <form>
                <input
                type="text"
                placeholder = "Name"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <br />
                <input
                type = "email"
                placeholder = "Email"
                onChange = {(e) => setEmail(e.target.value)}
                required
            />
            <br />
                <input 
                type = "password"
                placeholder = "Password"
                onChange = {(e) => setPassword(e.target.value)}
                required
            />
            <br />
            <button type="button" onClick={registerUser}>
                register
            </button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default RegistrationForm;