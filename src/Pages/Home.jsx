import React, {useContext, useEffect} from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material';
import MyContext from '../Context';
import PostCard from '../components/PostCard'
import NotLogged from '../components/NotLogged'
import WritePost from '../components/WritePost'
import axios from 'axios';

function Home() {
  const { posts, auth, setPosts, URL } = useContext(MyContext)

  useEffect(() => {
    setInterval(() => {
      console.log("working")
      axios.get(`${URL}posts`)
        .then(res => {
          setPosts(res.data)
        })
    }, 5000)
  }, [setPosts, URL])

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {auth ? <WritePost /> : <NotLogged />}
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
    </div>
  )
}

export default Home