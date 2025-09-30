import React from 'react'
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';
import SetNewPassword from './pages/setNewPassword';
import ForgotSuccessMsg from './pages/ForgotSuccessMsg';

const App = () => {
  return (
    
      <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Signup/>} />
      <Route path="/login" element={ <Login/>} />
      <Route path="/forgotPassword" element={ <ForgotPassword/>} />
      <Route path="/passwordReset" element={ <PasswordReset/>} />
      <Route path="/setNewPassword" element={ <SetNewPassword/>} />
      <Route path="/forgotSuccessMsg" element={ <ForgotSuccessMsg/>} />
      </Routes>
      </BrowserRouter>
    
  )
}

export default App
