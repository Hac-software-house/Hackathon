import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frontend from "./Frontend"
import Authentication from "./Authentication"
import Dashboard from "./Dashboard/index"
import { AuthContext } from '../context/AuthContext';
import PrivateRoute from './Frontend/components/PrivateRoute';


export default function Routers() {
  const { isAuthenticated } = useContext(AuthContext)
  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="authentication/*" element={!isAuthenticated ? <Authentication /> : <Navigate to="/dashboard" />} />
        <Route path="dashboard/*" element={<PrivateRoute Component={Dashboard} />} />
      </Routes>
    </BrowserRouter>
  )
} 
