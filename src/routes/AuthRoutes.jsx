import React, { useContext } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import NotFound from '../Pages/NotFound';
import MyContext from '../Context';

function AuthRoutes() {
  const { auth } = useContext(MyContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/p/:nickname" element={<Profile />} />
      {auth && (
        <>
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  )
}

export default AuthRoutes