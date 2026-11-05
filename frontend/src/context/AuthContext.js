import React, {createContext, useContext, useState, useEffect} from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/auth/me')
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (name, email, password, phone) => {
    const res = await api.post('/auth/register', {name, email, password, phone});
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', {email, password});
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };

  const forgotPassword = async (email) => {
    return await api.post('/auth/forgotpassword', { email });
  };

  const resetPassword = async (token, password) => {
    return await api.put(`/auth/resetpassword/${token}`, { password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};