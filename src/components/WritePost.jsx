import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MyContext from '../Context';
import { Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';

export default function WritePost() {
  const {user, token, URL, fetchPosts} = React.useContext(MyContext)
  const [newPost, setNewPost] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const sendPost = (event) => {
    event.preventDefault();
    axios.defaults.headers.common['Authorization'] = token;
    if(newPost.trim() !== '') {
      setLoading(true)
      console.log(newPost)
      axios.post(`${URL}posts`, {
        content: newPost,
      }).then(() => {
          fetchPosts()
          setNewPost('')
          setLoading(false)
        }).catch(err => {
          setLoading(false)
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
      backgroundColor: 'white',
      width: '95%',
      maxWidth: '500px',
      minWidth: '300px',
      margin: '10px',
      borderRadius: '10px',
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
        Hello, {user.name}</Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          marginBottom: '5px',
        }}
      >
        What are you thinking?
      </Typography>
      <Box sx={{ width: '100%' }}
      component="form"
      onSubmit={sendPost}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Tell us what are you thinking"
          multiline
          maxRows={6}
          variant="outlined"
          fullWidth
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
        />
      </Box>
      <LoadingButton
        variant="contained"
        color="primary"
        onClick={sendPost}
        loading={loading}
        sx={{
          marginTop: '10px',
          alignSelf: 'center',
          width: '50%',
          marginBottom: '10px',
        }}
      >
        Post
      </LoadingButton>
      <div>
      </div>
    </Container>
    </Box>
  );
}
