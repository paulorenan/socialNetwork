import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import {Card, CardHeader, CardContent, CardActions, Box, IconButton,Typography, Menu } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoadingButton from '@mui/lab/LoadingButton';
import isMoment from 'moment';
import AnswerDialog from './AnswerDialog';
import MyContext from '../Context';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostCard(props) {
  const { post, fetch } = props
  const { user, auth, URL, axios } = useContext(MyContext)
  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [numberComments, setNumberComments] = useState(0)
  const [loading, setLoading] = useState(true)
  const [moment, setMoment] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [postLike, setPostLike] = useState([])
  const [loadLike, setLoadLike] = useState(true)
  const [loadingData, setLoadingData] = useState(true)
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => { // get likes
    setLoadLike(true)
    axios.get(`${URL}likes/post/${post.id}`).then(res => {
      setPostLike(res.data)
      setLoadLike(false)
    });
  }, [axios, URL, post.id])

  useEffect(() => {
    if ((user && auth) && postLike.length > 0) {
      if (postLike.find(like => like.userId === user.id)) {
        setLike(true)
      }
    }
  }, [user, postLike, auth]);

  const handleLike = async () => {
    if (auth) {
      setLoadLike(true)
      if (like) {
        await axios.delete(`${URL}likes/${post.id}`, { postId: post.id })
        setLike(false)
        axios.get(`${URL}likes/post/${post.id}`).then(res => {
          setPostLike(res.data)
          setLoadLike(false)
          setLike(false)
        });
      } else {
        await axios.post(`${URL}likes`, { postId: post.id })
        axios.get(`${URL}likes/post/${post.id}`).then(res => {
          setPostLike(res.data)
          setLoadLike(false)
          setLike(true)
        });
      }
    } else {
      alert('Você precisa estar logado para curtir um post')
    }
  }

  useEffect(() => {
    if (auth) {
      if (post.userId === user.id) {
        setShowMore(true)
      }
    }
  }, [user, post, auth])

  useEffect(() => {
    axios.get(`${URL}answers/count/${post.id}`).then(res => {
      setNumberComments(res.data)
      setLoading(false)
    })
  }, [URL, axios, post.id])

  useEffect(() => {
    axios.get(`${URL}answers/count/${post.id}`).then(res => {
      setNumberComments(res.data)
    })
  }, [URL, axios, post.id])

  useEffect(() => {
    setLoadingData(true)
    const date = isMoment(post.createdAt).fromNow()
    const splitDate = date.split('')
    const arrDate = []
    arrDate[0] = splitDate[0]
    splitDate.shift();
    if (!isNaN(splitDate[0])) {
      arrDate[1] = splitDate[0]
      splitDate.shift();
    }
    const joinDate = splitDate.join('')
    if(joinDate.includes('days') && (arrDate.join('') > 3)) {
      setMoment(true)
    } else if (joinDate.includes('month')) {
      setMoment(true)
    } else if (joinDate.includes('year')) {
      setMoment(true)
    } else {
      setMoment(false)
    }
    setLoadingData(false)
  }, [post.createdAt])

  const handleNavigate = () => {
    window.scrollTo(0, 0)
    navigate(`/p/${post.user.nickName}`)
  }

  return (
    <Card className="card" sx={{ maxWidth: 450, width:'100%', minWidth: 330, margin: 1, borderRadius: 0 }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ bgcolor: red[500], cursor: 'pointer' }}
            aria-label="user"
            onClick={handleNavigate}
            src={post.user.image}
          >
            {post.user.name[0].toUpperCase()}
          </Avatar>
        }
        action={
          showMore &&
          <>
            <IconButton aria-label="settings"  onClick={handleOpenUserMenu}>
              <MoreVertIcon/>
            </IconButton>
            <Menu
              sx={{ mt: '35px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <EditPost post={post} click={handleCloseUserMenu} fetch={fetch} />
              <DeletePost post={post} click={handleCloseUserMenu} fetch={fetch} />
            </Menu>
          </>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={handleNavigate}
            >
              {post.user.name}
            </Box>
            {!loadingData && (moment ?
              <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).format('ll')}</Box> 
              : 
              <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).fromNow()}</Box>
            )}
          </Box>
        } 
        subheader={
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
              <Box
              sx={{ cursor: 'pointer' }}
              onClick={handleNavigate}
              >
                @{post.user.nickName}
              </Box>
              {(post.createdAt !== post.updatedAt) && 
              <Typography
                variant="caption"
                sx={{ ml: 'auto', fontSize: '0.8rem' }}
                color="textSecondary"
              >
                (edit)
              </Typography> }
            </Box>
        }
      />
      <CardContent sx={{ padding: 0 }}>
        <ReactMarkdown className="mark" remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
        {(post.image) &&
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
            <img src={post.image} alt="post" className='postImage'/>
          </Box>
        }
      </CardContent>
      <CardActions disableSpacing>
        <LoadingButton onClick={handleLike} disabled={!auth} loading={loadLike}>
          {postLike.length} {postLike.length === 1 ? 'like' : 'likes'}
          { like ? <FavoriteIcon sx={{ color: 'red', marginLeft: 1}}/> : <FavoriteBorderIcon sx={{ color: 'red', marginLeft: 1}}/> }
        </LoadingButton>
        <LoadingButton
          size="small"
          onClick={handleExpandClick}
          sx={{ cursor: 'pointer', mx: 'auto' }}
          loading={loading}
        >
          {numberComments === 1 ? `${numberComments} Comment` : `${numberComments} Comments`}
        </LoadingButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
        <AnswerDialog post={post} expanded={expanded} set={setNumberComments} />
    </Card>
  )
}

export default PostCard