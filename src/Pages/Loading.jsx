import React from 'react';
import { Box } from '@mui/material';
import logo from '../images/logo.png';
import loadingGif from '../images/loading.svg';

function Loading() {
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