import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import MyContext from '../Context'
import axios from 'axios'
import Header from '../components/Header'
import { Avatar, Box, Typography } from '@mui/material'
import PostCard from '../components/PostCard'
import EditProfile from '../components/EditProfile'

function Profile() {
  const { nickname } = useParams()
  const [userLink, setUserLink] = useState(null)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadCountLikes, setLoadCountLikes] = useState(false)
  const [loadCountComments, setLoadCountComments] = useState(false)
  const [countLikes, setCountLikes] = useState(0)
  const [countComments, setCountComments] = useState(0)
  const {URL, user} = useContext(MyContext)

  useEffect(() => {
    setLoading(true)
    axios.get(`${URL}users/${nickname}`)
      .then(res => {
        setUserLink(res.data)
        setLoading(false)
      }).catch(() => {
        setError(true)
        setLoading(false)
      });
  }, [nickname, URL])

  useEffect(() => {
    if (userLink) {
      axios.get(`${URL}posts/user/${userLink.id}`)
        .then(res => {
          setPosts(res.data)
        }).catch(() => {
          setError(true)
          setLoading(false)
        });
    }
  }, [userLink, URL])

  useEffect(() => {
    if (userLink) {
      axios.get(`${URL}answers/user/count/${userLink.id}`)
        .then(res => {
          setCountComments(res.data)
          setLoadCountComments(true)
        }).catch(() => {
          setError(true)
          setLoading(false)
        });
    }
  }, [userLink, URL])

  useEffect(() => {
    if (userLink) {
      axios.get(`${URL}likes/user/count/${userLink.id}`)
        .then(res => {
          setCountLikes(res.data)
          setLoadCountLikes(true)
        }).catch(() => {
          setError(true)
          setLoading(false)
        });
    }
  }, [userLink, URL])

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${URL}users/${nickname}`)
      setUserLink(res.data)
      setLoading(false)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

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
                src={userLink.image}
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
                  {userLink.name}
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
                  @{userLink.nickName}
                </Typography>
                { user && (userLink.id === user.id) ? (
                  <EditProfile user={userLink} fetch={fetchUser} />
                ) : null }
                {loadCountLikes && loadCountComments ? (
                  <Typography
                    variant="h6"
                    component="h2"
                    color="textSecondary"
                    textAlign="center"
                    sx={{
                      fontWeight: 'fontWeightBold',
                      margin: '20px',
                      marginTop: '0px',
                      marginBottom: '10px',
                    }}
                    >
                    @{userLink.nickName} has {posts.length} posts, {countComments} comments and give {countLikes} likes
                    </Typography>
                ) : null}
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