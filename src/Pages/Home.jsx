import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import MyContext from '../Context';
import PostCard from '../components/PostCard'
import NotLogged from '../components/NotLogged'
import WritePost from '../components/WritePost'

function Home() {
  const { posts, auth } = useContext(MyContext)
  let navigate = useNavigate()

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
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