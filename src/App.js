import React, { useContext } from 'react';
import MyContext from './Context';
import AuthRoutes from './routes/AuthRoutes';
import NotAuthRoutes from './routes/NotAuthRoutes';
import LoadingRoute from './routes/LoadingRoute';
import './App.css';

function App() {
  const { loading } = useContext(MyContext);

  return (
    <>
    {loading ? <LoadingRoute /> : (
      <>
      <AuthRoutes />
      <NotAuthRoutes />
      </>
    )}
    </>
  );
}

export default App;
