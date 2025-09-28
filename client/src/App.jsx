import React from 'react'
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    
      <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Signup/>} />
      <Route path="/login" element={ <Login/>} />
      </Routes>
      </BrowserRouter>
    
  )
}

export default App
