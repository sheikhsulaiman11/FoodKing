import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const { signup } = useAuth();
    const navigate   = useNavigate();

    const [role, setRole]   = useState('user');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // common fields
    const [firstName, setFirstName] = useState('');
    const [lastName,  setLastName]  = useState('');
    const [email,     setEmail]     = useState('');
    const [password,  setPassword]  = useState('');

    // restaurant owner extra fields
    const [restaurantName, setRestaurantName] = useState('');
    const [location,       setLocation]       = useState('');
    const [deliveryTime,   setDeliveryTime]   = useState('');

    const handleSignup = async () => {
        setError('');
        if (!firstName || !lastName || !email || !password) {
            setError('Please fill in all required fields.');
            return;
        }
        if (role === 'restaurant_owner' && (!restaurantName || !location || !deliveryTime)) {
            setError('Please fill in all restaurant details.');
            return;
        }

        setLoading(true);
        try {
            const payload = { firstName, lastName, email, password, role };
            if (role === 'restaurant_owner') {
                payload.restaurantData = { name: restaurantName, location, deliveryTime };
            }
            await signup(payload);
            navigate(role === 'restaurant_owner' ? '/restaurant-dashboard' : '/');
        } catch (err) {
            setError(err?.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-md p-8">

                {/* Logo */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-orange-500">FoodKing</h1>
                    <p className="text-sm text-gray-500 mt-1">Create your account</p>
                </div>

                {/* Role toggle */}
                <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-6">
                    <button
                        onClick={() => setRole('user')}
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${
                            role === 'user'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        Customer
                    </button>
                    <button
                        onClick={() => setRole('restaurant_owner')}
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${
                            role === 'restaurant_owner'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        Restaurant Owner
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
                        {error}
                    </p>
                )}

                {/* Owner personal name */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">First name</label>
                        <input
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Last name</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                        />
                    </div>
                </div>

                {/* Restaurant fields */}
                {role === 'restaurant_owner' && (
                    <div className="mb-3 flex flex-col gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Restaurant name</label>
                            <input
                                type="text"
                                placeholder="e.g. Johns Kitchen"
                                value={restaurantName}
                                onChange={e => setRestaurantName(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Location</label>
                            <input
                                type="text"
                                placeholder="e.g. Ludhiana, Punjab"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Delivery time</label>
                            <input
                                type="text"
                                placeholder="e.g. 30-40 mins"
                                value={deliveryTime}
                                onChange={e => setDeliveryTime(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                            />
                        </div>
                    </div>
                )}

                {/* Email + Password */}
                <div className="flex flex-col gap-3 mb-6">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
                >
                    {loading ? 'Creating account...' : 'Create account'}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-orange-500 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
