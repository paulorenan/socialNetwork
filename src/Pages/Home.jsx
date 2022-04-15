import React, {useContext, useEffect} from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material';
import MyContext from '../Context';
import PostCard from '../components/PostCard'
import NotLogged from '../components/NotLogged'
import WritePost from '../components/WritePost'

function Home() {
  const { posts, auth, setPosts, URL, axios } = useContext(MyContext)

  useEffect(() => {
    setInterval(() => {
      axios.get(`${URL}posts`)
        .then(res => {
          setPosts(res.data)
        })
    }, 5000)
  }, [setPosts, URL, axios])

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(to right, #67b26f, #4ca2cd)',
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