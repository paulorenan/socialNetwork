import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../Pages/Loading';

function LoadingRoute() {
  return (
    <Routes>
      <Route path="*" element={<Loading />} />
    </Routes>
  )
}

export default LoadingRoute