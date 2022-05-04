import React, { useState, useContext} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MyContext from '../Context';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

export default function WritePost() {
  const {user, token, URL, fetchPosts, CLIENT_ID } = useContext(MyContext)
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingPhoto, setLoadingPhoto] = useState(false)
  const [image, setImage] = useState('')

  const sendPost = (event) => {
    event.preventDefault();
    axios.defaults.headers.common['Authorization'] = token;
    if(newPost.trim() !== '' || image !== '') {
      setLoading(true)
      axios.post(`${URL}posts`, {
        content: newPost,
        image: image
      }).then(() => {
          fetchPosts(10)
          setNewPost('')
          setLoading(false)
        }).catch(err => {
          setLoading(false)
        })
      setNewPost('')
      setImage('')
    }
  }

  const addPhoto = async (event) => {
    event.preventDefault();
    setLoadingPhoto(true)
    if(event.target.files[0]) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      const urlImage = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${CLIENT_ID}`,
        },
        body: formData,
      })
      console.log(urlImage)
      const data = await urlImage.json()
      setImage(data.data.link)
    }
    setLoadingPhoto(false)
  }


  return (
    <Box
    className='radios'
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%',
      maxWidth: '500px',
      minWidth: '300px',
      margin: '10px',
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
      {image !== '' &&
      <img src={image} alt="uploaded" width="100%" height="100%" />
      }
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={addPhoto} />
          <LoadingButton variant="contained" component="span" startIcon={<PhotoCamera />} loading={loading || loadingPhoto}>
            Add photo
          </LoadingButton>
        </label>
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
            marginLeft: '10px',
          }}
        >
          Post
        </LoadingButton>
      </Stack>
      <div>
      </div>
    </Container>
    </Box>
  );
}
