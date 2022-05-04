import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import NotFound from '../Pages/NotFound';
import MyContext from '../Context';


function NotAuthRoutes() {
  const { auth } = useContext(MyContext);
  return (
    <Routes>
      {!auth && 
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </>}
    </Routes>
  )
}

export default NotAuthRoutes