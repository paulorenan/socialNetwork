import React, { useState, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyContext from './Context';
import axios from 'axios';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp';

function App() {
  const { auth } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {!auth && 
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </>}
      <Route path="*" element={<Navigate to={auth ? "/" : "/login" } /> } />
    </Routes>
  );
}

export default App;
