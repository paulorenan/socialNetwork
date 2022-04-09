import React, { useState, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyContext from './Context';
import axios from 'axios';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp';

function App() {
  const { token, auth, setAuth } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      load();
      setLoading(false);
    }
    setLoading(false);
  }, [token, setAuth]);

  return (
    <div>
      {!loading ? (
      <Routes>
        {auth ? (
          <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="*" element={<Navigate to={auth ? "/" : "/login" } /> } />
      </Routes>
      ) : (
        null
      )}
    </div>
  );
}

export default App;
