import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, logoutUser, getMe, signupUser  } from '../services/authServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getMe();
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

    const signup = async (userData) => {

        const res = await signupUser(userData);
        localStorage.setItem('token', res.token);
        setUser(res.user);
        setIsLoggedIn(true);
};

    const login = async (credentials) => {
        const res = await loginUser(credentials);
        localStorage.setItem('token', res.token); // ✅ res.token not res.data.token
        setUser(res.user);                         // ✅ res.user not res.data.user
        setIsLoggedIn(true);
};

    const logout = async () => {

        await logoutUser();
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            loading,
            signup,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;