// pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login({ email, password, role });
            if (role === 'restaurant_owner') {
                navigate('/restaurant-dashboard'); // ✅ redirect to dashboard
            } else {
                navigate('/'); // ✅ redirect to home
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}

            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Customer</option>
                <option value="restaurant_owner">Restaurant Owner</option>
            </select>

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