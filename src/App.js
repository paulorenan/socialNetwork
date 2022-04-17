import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyContext from './Context';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp';
import './App.css';

function App() {
  const { auth } = useContext(MyContext);

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/:nickname" element={<Profile />} />
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
