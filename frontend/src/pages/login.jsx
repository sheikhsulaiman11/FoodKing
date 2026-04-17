// pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();       // ← from context
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login({ email, password }); // ← calls context login
            navigate('/');                     // ← redirect to home
        } catch(err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
            />
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;