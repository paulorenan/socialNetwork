import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material';

function NotFound() {
  return (
    <div className='App'>
    <Header />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        width: '100%',
      }}
    >
      <Box sx={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>
        404
        <Box sx={{ fontSize: '20px', textAlign: 'center' }}>
          Page not found
        </Box>
      </Box>
    </Box>
  </div>
  )
}

export default NotFound