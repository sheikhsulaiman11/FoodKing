import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurant from './pages/Restaurant';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Public routes */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/restaurant/:id' element={<Restaurant />} />

                {/* Protected routes */}
                <Route path='/cart' element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />

                {/* 404 */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;