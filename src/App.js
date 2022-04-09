import React, { useState, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyContext from './Context';
import axios from 'axios';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  const { token, auth, setAuth } = useContext(MyContext);

  useEffect(() => {
    async function load() {
      axios.defaults.headers.common['Authorization'] = token;
      try{
      const load1 = await axios.post('http://localhost:5432/api/load');
      if(load1.status === 200){
        setAuth(true);
      }
      }catch(err){
        setAuth(false);
      }
    }
    if(token){
      load();
    }
  }, [token, setAuth]);

  return (
    <Routes>
      {auth ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/login" element={<Login />} />
      )}
      <Route path="*" element={<Navigate to={auth ? "/" : "/login" } /> } />
    </Routes>
  );
}

export default App;
