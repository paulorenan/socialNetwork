import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Box } from '@mui/material'

function NotLogged() {
  let navigate = useNavigate()
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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