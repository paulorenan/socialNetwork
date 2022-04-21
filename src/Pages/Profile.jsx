import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import MyContext from '../Context'
import Header from '../components/Header'
import { Avatar, Box, Typography } from '@mui/material'
import PostCard from '../components/PostCard'
import EditProfile from '../components/EditProfile'
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

function Profile() {
  const { nickname } = useParams()
  const [userLink, setUserLink] = useState(null)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingPhoto, setLoadingPhoto] = useState(false)
  const [countFollowers, setCountFollowers] = useState(0)
  const [loadingCountFollowers, setLoadingCountFollowers] = useState(true)
  const [countFollowing, setCountFollowing] = useState(0)
  const [loadingCountFollowing, setLoadingCountFollowing] = useState(true)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState(false)
  const [loadFollowing, setLoadFollowing] = useState(false)
  const [loadingFollowers, setLoadingFollowers] = useState(true)
  const {URL, user, CLIENT_ID, axios, fetchLoad, auth } = useContext(MyContext)

  const sendImage = async (e) => {
    e.preventDefault()
    setLoadingPhoto(true)
      if (e.target.files[0]) {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      try {
        const res = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: `Client-ID ${CLIENT_ID}`,
          },
          body: formData,
        })
        const data = await res.json()
        await axios.put(`${URL}users/me/image`, {
          image: data.data.link,
        })
        await getUser();
        await fetchLoad();
      } catch (err) {
        alert('Something went wrong')
      }
    }
    setLoadingPhoto(false)
  }

  const getUser = async () => {
    try {
      const res = await axios.get(`${URL}users/${nickname}`)
      setUserLink(res.data)
      setLoading(false)
    } catch (err) {
      setError(true)
    }
  }

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
  }, [nickname, URL, axios])

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
  }, [userLink, URL, axios])

  useEffect(() => { // fetch count followers
    if (userLink) {
      setLoadingCountFollowers(true)
      axios.get(`${URL}followers/count/${userLink.id}`)
        .then(res => {
          setCountFollowers(res.data)
          setLoadingCountFollowers(false)
        }).catch(() => {
          setError(true)
          setLoadingCountFollowers(false)
        });
    }
  }, [userLink, URL, axios])

  useEffect(() => { // fetch count following
    if (userLink) {
      setLoadingCountFollowing(true)
      axios.get(`${URL}followers/following/count/${userLink.id}`)
        .then(res => {
          setCountFollowing(res.data)
          setLoadingCountFollowing(false)
        }).catch(() => {
          setError(true)
          setLoadingCountFollowing(false)
        });
    }
  }, [userLink, URL, axios])

  useEffect(() => { // fetch followers
    if (userLink) {
      setLoadingFollowers(true)
      axios.get(`${URL}followers/${userLink.id}`)
        .then(res => {
          setFollowers(res.data)
          setLoadingFollowers(false)
        }).catch(() => {
          setError(true)
          setLoadingFollowers(false)
        });
    }
  }, [userLink, URL, axios])

  useEffect(() => { // fetch following
    if (user) {
      const userFollowing = followers.some(follower => follower.followerId === user.id)
      if (userFollowing) {
        setFollowing(true)
      }
    }
  }, [followers, user])

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

  const getCountFollowers = async () => {
    try {
      const res = await axios.get(`${URL}followers/count/${userLink.id}`)
      setCountFollowers(res.data)
      setLoadingCountFollowers(false)
    } catch (err) {
      setError(true)
      setLoadingCountFollowers(false)
    };
  };


  const follow = async () => {
    try {
      if (following) {
        setLoadFollowing(true)
        await axios.delete(`${URL}followers/${userLink.id}`)
        await getCountFollowers();
        setFollowing(false)
        setLoadFollowing(false)
      } else {
        setLoadFollowing(true)
        await axios.post(`${URL}followers/`, {
          userId: userLink.id,
        })
        await getCountFollowers();
        setFollowing(true)
        setLoadFollowing(false)
      }
    } catch (err) {
      alert('Something went wrong')
    }
    setLoadFollowing(false)
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Avatar
                    src={userLink.image}
                    sx={{ width: ['100px', '150px'], height: ['100px', '150px'], margin: '20px', marginBottom: '0px' }}
                  />
                  { (auth && (userLink.id === user.id)) ? (
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px',
                      }}
                    >
                      <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={sendImage} />
                        <LoadingButton component="span" loading={loadingPhoto}>
                          <PhotoCamera />
                        </LoadingButton>
                      </label>
                      <EditProfile user={userLink} fetch={fetchUser} />
                    </Stack>
                  ) : <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                    <LoadingButton
                      variant="contained"
                      component="span"
                      loading={loadingFollowers || loadFollowing}
                      disabled={!auth}
                      sx={{ marginRight: '20px' }}
                      onClick={follow}
                    >
                    {auth && (following) ? 'Unfollow' : 'Follow'}
                  </LoadingButton>
                  </Box>}
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 'fontWeightBold', marginBottom: '0px' }}
                  >
                    {userLink.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    color="textSecondary"
                    sx={{ fontWeight: 'fontWeightBold', marginBottom: '2px' }}
                  >
                    @{userLink.nickName}
                  </Typography>
                </Box>
              </Box>
                { !loadingCountFollowers && !loadingCountFollowing && 
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 'fontWeightBold', marginBottom: '2px', marginLeft: '20px' }}
                    >
                      {countFollowers} Followers | {countFollowing} Following
                    </Typography>
                  </Box>
                    }
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