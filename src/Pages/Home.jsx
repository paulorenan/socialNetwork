import React, {useContext, useEffect} from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material';
import MyContext from '../Context';
import PostCard from '../components/PostCard'
import NotLogged from '../components/NotLogged'
import WritePost from '../components/WritePost'
import axios from 'axios';
import '../App.css'

function Home() {
  const { posts, auth, URL, setPosts } = useContext(MyContext)

  useEffect(() => {
    const inter = setInterval(() => {
      axios.get(`${URL}posts`)
        .then(res => {
          setPosts(res.data)  
        })
    }, 5000)
    return () => {
      clearInterval(inter)
    }
  }, [URL, setPosts])

  return (
    <div className='App'>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
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