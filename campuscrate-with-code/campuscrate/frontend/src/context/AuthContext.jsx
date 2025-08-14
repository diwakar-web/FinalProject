import React, { createContext, useContext, useEffect, useState } from 'react';
import * as auth from '../services/authService.js';

const Ctx = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('cc_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(()=>localStorage.getItem('cc_token'));

  const login = async (email, password) => {
    const { token, user } = await auth.login(email, password);
    localStorage.setItem('cc_token', token);
    localStorage.setItem('cc_user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };
  const register = async (name, email, password) => {
    const { token, user } = await auth.register(name, email, password);
    localStorage.setItem('cc_token', token);
    localStorage.setItem('cc_user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem('cc_token');
    localStorage.removeItem('cc_user');
    setToken(null);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, token, login, register, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
