import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material';
import MyContext from '../Context';
import logo from '../images/logo.png';
import loadingGif from '../images/loading.svg';

function Loading() {
  const { loading } = useContext(MyContext);
  const navigate = useNavigate()
  const { way } = useParams()

  useEffect(() => {
    if (!loading) {
      navigate(`/${way}`)
    } else {
    }
  }, [loading, navigate, way])

  return (
    <div className='App'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <img src={logo} alt='logo' />
          <img src={loadingGif} alt='loading' />
        </Box>
      </Box>
  </div>
  )
}

export default Loading