import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoutes = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!isLoggedIn) return <Navigate to='/login' />;

    return children;
};

export default ProtectedRoutes;