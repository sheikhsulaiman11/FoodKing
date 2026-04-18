// context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, getMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // check if user is already logged in on page load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // call backend to check if cookie is valid
                const res = await getMe(); // fetch current user
                setUser(res.data);
                setIsLoggedIn(true);
            } catch(err) { 
                setUser(null);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const res = await loginApi(credentials);
        setUser(res.data.user);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await logoutApi();
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;