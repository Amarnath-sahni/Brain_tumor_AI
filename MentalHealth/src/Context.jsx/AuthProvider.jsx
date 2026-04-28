import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 👉 Load user from localStorage initially
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ LOGIN
  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/user/login",
        {
          email: userData.email,
          password: userData.password,
        },
        {
          withCredentials: true,
        }
      );

      const loggedUser = res.data.data;

      // 👉 Save in state
      setUser(loggedUser);

      // 👉 Save in localStorage
      localStorage.setItem("user", JSON.stringify(loggedUser));

      toast.success(res.data.message);

      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed ❌"
      );
      return false;
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await axios.delete(
        "http://localhost:9000/api/user/logout",
        { withCredentials: true }
      );

      // 👉 Clear state
      setUser(null);

      // 👉 Clear localStorage
      localStorage.removeItem("user");

      toast.success("Logout successful 👋");
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ OPTIONAL: Sync localStorage if user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};