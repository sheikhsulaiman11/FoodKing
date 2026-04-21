import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

const ProtectedRoutes = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return <Loader />;

    if (!isLoggedIn) return <Navigate to='/login' />;

    return children;
};

export default ProtectedRoutes;