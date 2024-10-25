import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from './users.json'; // Import the user data
import './LoginForm.css'; // Import the CSS file

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if user credentials match
        const user = usersData.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            // Redirect based on user role
            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            
                <button type="submit">Login</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;