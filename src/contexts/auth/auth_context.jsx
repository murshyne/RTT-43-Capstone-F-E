import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth', formData);
      setCookie('token', res.data.token);
    } catch (err) {
      throw err;
    }
  };

  const signUp = async (formData) => {
    try {
      const res = await axios.post('http://localhost:3000/api/users', formData);
      setCookie('token', res.data.token);
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    removeCookie('token');
  };

  const value = useMemo(() => ({
    cookies,
    login,
    logout,
    signUp,
  }), [cookies]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
