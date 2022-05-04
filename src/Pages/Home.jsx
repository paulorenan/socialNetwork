import React, {useContext, useEffect, useState, useRef} from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material';
import MyContext from '../Context';
import PostCard from '../components/PostCard'
import NotLogged from '../components/NotLogged'
import WritePost from '../components/WritePost'
import loadingGif from '../images/loading.svg';
import '../App.css'

function Home() {
  const { posts, auth, fetchPosts } = useContext(MyContext)
  const [limit, setLimit] = useState(10)
  const [end, setEnd] = useState(false)
  const loaderRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting){
        setLimit(old => old + 10);
      }
    }, options);

    if (loaderRef.current){
      observer.observe(loaderRef.current);
    }
  }, []);

  useEffect(() => {
    fetchPosts(limit)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  useEffect(() => {
    const theEnd = posts.find(post => post.id === 7)
    if (theEnd) {
      setEnd(true)
    } else {
      setEnd(false)
    }
  }, [posts])

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
        {!end && <div ref={loaderRef} className='loader'>
          <img src={loadingGif} alt='loading' style={{ width: '100px' }} />
          </div>}
      </Box>
    </div>
  )
}

export default Home