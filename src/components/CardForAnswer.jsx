import * as React from 'react';
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

export default function CardForAnswer({ post, fetch }) {
  const [ showMore, setShowMore ]  = React.useState(false);
  const { user, auth } = React.useContext(MyContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  React.useEffect(() => {
    if (auth) {
      if (post.userId === user.id) {
        setShowMore(true)
      }
    }
  }, [user, post, auth]);

  return (
    <Box 
      sx={{ maxWidth: 600, minWidth: 330, borderTop: '1px solid #e0e0e0', margin: 1 }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], cursor: 'pointer' }}
            aria-label="user"
            onClick={() => navigate(`/p/${post.user.nickName}`)}
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
              onClick={() => navigate(`/p/${post.user.nickName}`)}
            >
              {post.user.name}
            </Box>
            <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).fromNow()}</Box>
          </Box>
        } 
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/p/${post.user.nickName}`)}
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
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
    </Box>
  )
}