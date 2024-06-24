import { createContext, useContext, useEffect, useState } from "react";
import { API_URI } from "../utils/env";
const authContext = createContext();

const AuthProvider = ({ children }) => {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch(`${API_URI}/auth/check`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const resp = await res.json();
        if (resp.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);
  const login = async (formData) => {
    try {
      const res = await fetch(`${API_URI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resp = await res.json();
      if (resp.success) {
        localStorage.setItem("user", JSON.stringify(resp.token));
        localStorage.setItem("userData", JSON.stringify(resp.data));
        setIsLoggedIn(true);
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (formData) => {
    try {
      const res = await fetch(`${API_URI}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resp = await res.json();
      if (resp.success) {
        alert(resp.data);
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{ isLoggedIn, login, signup, loading, logout }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(authContext);
