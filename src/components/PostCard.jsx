import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import {Card, CardHeader, CardContent, CardActions, Box, IconButton,Typography, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoadingButton from '@mui/lab/LoadingButton';
import isMoment from 'moment';
import AnswerDialog from './AnswerDialog'
import MyContext from '../Context'

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
  const { post } = props
  const { user, auth, URL, axios } = useContext(MyContext)
  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [numberComments, setNumberComments] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (user) {
      if (post.likes.find(like => like.userId === user.id)) {
        setLike(true)
      }
    }
  }, [user, post]);

  const handleLike = () => {
    if (auth) {
      if (like) {
        axios.delete(`${URL}likes/${post.id}`, { postId: post.id }).then(() => { setLike(false) })
      } else {
        axios.post(`${URL}likes`, { postId: post.id }).then(() => { setLike(true) })
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
    setInterval(() => {
      axios.get(`${URL}answers/count/${post.id}`).then(res => {
        setNumberComments(res.data)
      })
    }, 5000)
  }, [URL, axios, post.id])



  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 450, width:'80%', minWidth: 330, margin: 1 }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ bgcolor: red[500], cursor: 'pointer' }}
            aria-label="recipe"
            onClick={() => navigate(`/p/${post.user.nickName}`)}
          >
            {post.user.image ? <img src={post.user.image} alt="user" /> : post.user.name[0]}
          </Avatar>
        }
        action={
          showMore &&
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate(`/p/${post.user.nickName}`)}
          >
            <Box sx={{ fontWeight: 'bold' }}>{post.user.name}</Box>
            <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).fromNow()}</Box>
          </Box>
        } 
        subheader={
            <Box
              onClick={() => navigate(`/p/${post.user.nickName}`)}
              sx={{ cursor: 'pointer' }}
              >
                @{post.user.nickName}
            </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleLike} disabled={!auth}>
          {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
          { like ? <FavoriteIcon sx={{ color: 'red', marginLeft: 1}}/> : <FavoriteBorderIcon sx={{ color: 'red', marginLeft: 1}}/> }
        </Button>
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
        <AnswerDialog post={post} expanded={expanded} />
    </Card>
  )
}

export default PostCard