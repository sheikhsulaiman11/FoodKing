import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoutes';

import Home from './pages/user/Home';
import Cart from './pages/user/Cart';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import RestaurantsPage from './pages/user/RestaurantsPage';
import NotFound from './pages/NotFound';
import Checkout from './pages/user/Checkout';
import OrderHistory from './pages/user/OrderHistory';
import OrderSuccess from './pages/user/OrderSuccess';
import OrderTracking from './pages/user/OrderTracking';
import RestaurantDashboard from './pages/restaurants/RestaurantDashboard';
import ManageOrders from './pages/restaurants/ManageOrders';
import ManageMenu from './pages/restaurants/ManageMenu';

// only lets restaurant owners through, redirects customers to home
const RestaurantRoute = ({ children }) => {
    const { user, isLoggedIn, loading } = useAuth();
    if (loading) return null;
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (user?.role !== 'restaurant_owner') return <Navigate to="/" />;
    return children;
};

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/restaurants" element={<RestaurantsPage />} />
                <Route path="/restaurants/:id" element={<RestaurantsPage />} />

                {/* Customer protected routes */}
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                <Route path="/order/:id" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />

                {/* Restaurant owner routes */}
                <Route path="/restaurant-dashboard" element={<RestaurantRoute><RestaurantDashboard /></RestaurantRoute>} />
                <Route path="/restaurant-dashboard/menu" element={<RestaurantRoute><ManageMenu /></RestaurantRoute>} />
                <Route path="/restaurant-dashboard/orders" element={<RestaurantRoute><ManageOrders /></RestaurantRoute>} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
