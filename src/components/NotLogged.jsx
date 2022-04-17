import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Box } from '@mui/material'

function NotLogged() {
  let navigate = useNavigate()
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '95%',
      maxWidth: '500px',
      minWidth: '300px',
      margin: '10px',
      borderRadius: '10px',
    }}
  >
      <h1>Not logged</h1>
      <p>Do Login to write post and comments</p>
      <div>
      <Button onClick={() => navigate('/login')}>Login</Button>
      <Button onClick={() => navigate('/signup')}>Register</Button>
      </div>
    </Box>
  )
}

export default NotLogged