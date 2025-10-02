import "./styles/colors.css"; // ✅ global theme
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ import UserProvider
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
       <AuthProvider>
        <App />
       </AuthProvider>
    </UserProvider>
  </React.StrictMode>
);
