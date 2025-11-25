// src/context/AuthContext.jsx
"use client";
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // <--- ✅ 1. 이 줄이 있어야 함
  
  const login = (userData) => { // <--- ✅ 2. (userData)가 있어야 함
    setUser(userData);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}> {/* 'user'가 있어야 함 */}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);