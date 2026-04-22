// pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // customer fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // restaurant owner fields
    const [restaurantName, setRestaurantName] = useState('');
    const [location, setLocation] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [rating, setRating] = useState('');

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            if (role === 'user') {
                await signup({ firstName, lastName, email, password, role });
            } else {
                await signup({
                    firstName: restaurantName, // backend requires firstName
                    lastName: '-',             // backend requires lastName
                    email,
                    password,
                    role,
                    restaurantData: { name: restaurantName, location, deliveryTime, rating }
                });
            }
            navigate('/');
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}

            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Customer</option>
                <option value="restaurant_owner">Restaurant Owner</option>
            </select>

            {/* Customer fields */}
            {role === 'user' && (
                <>
                    <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                    <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                </>
            )}

            {/* Restaurant Owner fields */}
            {role === 'restaurant_owner' && (
                <>
                    <input type='text' value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} placeholder='Restaurant Name' />
                    <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
                    <input type='text' value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} placeholder='Delivery Time (e.g. 30 mins)' />
                    <input type='number' value={rating} onChange={(e) => setRating(e.target.value)} placeholder='Rating (1-5)' />
                </>
            )}

            {/* Common fields */}
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;