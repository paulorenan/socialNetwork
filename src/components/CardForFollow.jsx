import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardHeader, Avatar, Box } from '@mui/material/';
import { red } from '@mui/material/colors';

export default function CardForAnswer({ user }) {
  const navigate = useNavigate()


  const handleNavigate = () => {
    window.scrollTo(0, 0)
    navigate(`/p/${user.nickName}`)
  }

  return (
    <Box 
      sx={{ width: '90%', minWidth: 330, borderTop: '1px solid #e0e0e0', margin: 1 }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], cursor: 'pointer' }}
            aria-label="user"
            onClick={() => navigate(`/p/${user.nickName}`)}
            src={user.image}
          >
            {user.name[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={handleNavigate}
            >
              {user.name}
            </Box>         
          </Box>
        } 
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <Box
            sx={{ cursor: 'pointer' }}
            onClick={handleNavigate}
            >
              @{user.nickName}
            </Box>
          </Box>
      }
      />
    </Box>
  )
}