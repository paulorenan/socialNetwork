import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import MyContext from '../Context'
import axios from 'axios'
import Header from '../components/Header'
import { Avatar, Box, Typography } from '@mui/material'
import PostCard from '../components/PostCard'

function Profile() {
  const { nickname } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const {URL} = useContext(MyContext)

  useEffect(() => {
    setLoading(true)
    axios.get(`${URL}users/${nickname}`)
      .then(res => {
        setUser(res.data)
        setLoading(false)
      }).catch(() => {
        setError(true)
        setLoading(false)
      });
  }, [nickname, URL])

  useEffect(() => {
    if (user) {
      axios.get(`${URL}posts/user/${user.id}`)
        .then(res => {
          setPosts(res.data)
        }).catch(() => {
          setError(true)
          setLoading(false)
        });
    }
  }, [user, URL])

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
        {loading ? null : error ? <h1>User not found</h1> : (
          <>
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
              <Avatar
                src={user.image}
                sx={{
                  width: '100px',
                  height: '100px',
                  margin: '10px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'fontWeightBold',
                    marginBottom: '0px',
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="h2"
                  color="textSecondary"
                  sx={{
                    fontWeight: 'fontWeightBold',
                    marginBottom: '2px',
                  }}
                >
                  @{user.nickName}
                </Typography>
              </Box>
            </Box>
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        )}
      </Box>
    </div>
  )
}

export default Profile