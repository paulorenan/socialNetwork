import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import {Card, CardHeader, CardContent, CardActions, Box, IconButton,Typography, Button, Menu, MenuItem } from '@mui/material';
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
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    const interval = setInterval(() => {
      axios.get(`${URL}answers/count/${post.id}`).then(res => {
        setNumberComments(res.data)
      })
    }, 5000)
    return () => clearInterval(interval)
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
            <MoreVertIcon onClick={handleOpenUserMenu}/>
            <Menu
              sx={{ mt: '25px' }}
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
              <MenuItem  onClick={handleCloseUserMenu}>
                <EditPost post={post} />
              </MenuItem>
            </Menu>
          </IconButton>
        }
        title={
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate(`/p/${post.user.nickName}`)}
          >
            <Box sx={{ fontWeight: 'bold' }}>{post.user.name}</Box>
            <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).fromNow()}</Box>
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
        <Typography variant="body2" color="text.primary">
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