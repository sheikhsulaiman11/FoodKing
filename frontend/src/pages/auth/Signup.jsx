// pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await signup({ firstName, lastName, email, password });
            navigate('/');
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <input
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='FirstName'
            />
            <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='LastName'
            />
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
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;