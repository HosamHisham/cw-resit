import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';




const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const loginUser = async () => {
        try{
        const response = await fetch ('http://localhost:5000/user/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password})

        });
        if(!response.ok) {
            throw new Error('Invalid credentials');
        }
        const userData=await response.json ();
        if(userData.admin===1) 
            navigate('/home');
        else
        navigate('/home');
}

        catch(error){
            setMessage(error.message);
            alert(error.message);
        };
    };

    return (
        <div className = "form-section">
            <h3>User Login</h3>
            <form>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <br />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <br />
                <button type ="button" onClick={loginUser}>
                    Login
                </button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default LoginForm;
