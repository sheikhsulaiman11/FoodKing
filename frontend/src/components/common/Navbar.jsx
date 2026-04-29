import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const { isLoggedIn, logout, user } = useAuth(); 
    const navigate = useNavigate();
    const { cart } = useCart();
    const itemCount = cart?.items?.length || 0;

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
                           <>
                           <Link to="/cart" className="hover:text-orange-200 relative">
                                        🛒 Cart
                                {itemCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                                {itemCount > 99 ? '99+' : itemCount}
                            </span>
                                )}
                            </Link>
                            
                            <Link to="/orders" className="hover:text-orange-200">📦 Orders</Link>
                            </>
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