import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {Menu, CardHeader, CardContent,Avatar, Box } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import isMoment from 'moment';
import MyContext from '../Context';
import EditAnswer from './EditAnswer';
import DeleteAnswer from './DeleteAnswer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export default function CardForAnswer({ post, fetch }) {
  const [ showMore, setShowMore ]  = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [moment, setMoment] = useState(false);
  const { user, auth } = useContext(MyContext);
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  useEffect(() => {
    if (auth) {
      if (post.userId === user.id) {
        setShowMore(true)
      }
    }
  }, [user, post, auth]);

  useEffect(() => {
    const date = isMoment(post.createdAt).fromNow()
    const splitDate = date.split('')
    const arrDate = []
    arrDate[0] = splitDate[0]
    splitDate.shift();
    if (!isNaN(splitDate[0])) {
      arrDate[1] = splitDate[0]
      splitDate.shift();
    }
    if(splitDate.join('').includes('days')&& (arrDate.join('') > 3)) {
      setMoment(true)
    } else {
      setMoment(false)
    }
  }, [post.createdAt])

  const handleNavigate = () => {
    window.scrollTo(0, 0)
    navigate(`/p/${post.user.nickName}`)
  }

  return (
    <Box 
      sx={{ maxWidth: 600, minWidth: 330, borderTop: '1px solid #e0e0e0', margin: 1 }}
    >
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
            <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
              <MoreVertIcon />
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
              <EditAnswer answer={post} click={handleCloseUserMenu} fetch={fetch}/>
              <DeleteAnswer answer={post} click={handleCloseUserMenu} fetch={fetch}/>
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
            { moment ? 
            <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).format('ll')}</Box> 
            : 
            <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).fromNow()}</Box>
            }
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
      <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <ReactMarkdown className="mark" remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </CardContent>
    </Box>
  )
}