import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logout, user } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center">
            {/* Left side */}
           <div className="flex gap-6">
                {user?.role === 'restaurant_owner' ? (
                <Link to="/restaurant-dashboard" className="hover:text-orange-200">Dashboard</Link>
            ) : (
                <Link to="/" className="hover:text-orange-200">Home</Link>
            )}
        </div>
            {/* Right side */}
            <div className="flex gap-6 items-center">
                {isLoggedIn ? (
                    <>
                        {user?.role === 'user' && ( // ✅ only show cart for customers
                            <Link to="/cart" className="hover:text-orange-200">
                                🛒 Cart
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-white text-orange-500 px-4 py-1 rounded-full font-semibold hover:bg-orange-100"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-orange-200">Login</Link>
                        <Link
                            to="/signup"
                            className="bg-white text-orange-500 px-4 py-1 rounded-full font-semibold hover:bg-orange-100"
                        >
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;