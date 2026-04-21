import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Cart from './pages/user/Cart';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import RestaurantsPage from './pages/user/RestaurantsPage';
import NotFound from './pages/NotFound';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoutes';
import Checkout from './pages/user/Checkout';
import OrderHistory from './pages/user/OrderHistory';
import OrderSuccess from './pages/user/OrderSuccess';
import OrderTracking from './pages/user/OrderTracking';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Public routes */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/restaurants' element={<RestaurantsPage />} />

                {/* Protected routes */}
                <Route path='/cart' element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />

                {/* 404 */}
                <Route path='*' element={<NotFound />} />

                <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path='/orders' element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                <Route path='/order-success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                <Route path='/order/:id' element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;