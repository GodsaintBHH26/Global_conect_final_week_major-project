import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("AuthUser");
    if (savedUser) setAuthUser(JSON.parse(savedUser)); 
  }, []);

  const login = (data) => {
    setAuthUser(data);
    localStorage.setItem("AuthUser", JSON.stringify(data));
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setAuthUser(null); 
    localStorage.removeItem("AuthUser");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
