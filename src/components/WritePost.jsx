import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MyContext from '../Context';
import { Container } from '@mui/material';
import axios from 'axios';

export default function WritePost() {
  const {user, token, URL, fetchPosts} = React.useContext(MyContext)
  const [newPost, setNewPost] = React.useState('')

  const sendPost = (event) => {
    event.preventDefault();
    axios.defaults.headers.common['Authorization'] = token;
    if(newPost.trim() !== '') {
      console.log(newPost)
      axios.post(`${URL}posts`, {
        content: newPost,
      }).then(() => {
          fetchPosts()
          setNewPost('')
        }).catch(err => {
          console.log(err)
        })
    }
    setNewPost('')
  }


  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 'fontWeightBold',
          marginBottom: '5px',
          marginTop: '15px',
        }}
      >
        Olá, {user.name}</Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          marginBottom: '5px',
        }}
      >
        Escreva seu post
      </Typography>
      <Box sx={{ width: '100%' }}
      component="form"
      onSubmit={sendPost}
      >
        <TextField
          id="outlined-multiline-static"
          label="Post"
          multiline
          rows={1}
          variant="outlined"
          fullWidth
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={sendPost}
        sx={{
          marginTop: '10px',
          width: '60%',
          marginBottom: '10px',
        }}
      >
        Postar
      </Button>
      <div>
      </div>
    </Container>
    </Box>
  );
}
