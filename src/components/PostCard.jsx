import React from 'react'
import { useNavigate } from 'react-router-dom'
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
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import isMoment from 'moment';
import AnswerDialog from './AnswerDialog'

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 350, minWidth: 350, margin: 1 }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ bgcolor: red[500], cursor: 'pointer' }}
            aria-label="recipe"
            onClick={() => navigate(`/p/${post.User.nickName}`)}
          >
            {post.User.image ? <img src={post.User.image} alt="user" /> : post.User.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate(`/p/${post.User.nickName}`)}
          >
            <Box sx={{ fontWeight: 'bold' }}>{post.User.name}</Box>
            <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).fromNow()}</Box>
          </Box>
        } 
        subheader={
            <Box
              onClick={() => navigate(`/p/${post.User.nickName}`)}
              sx={{ cursor: 'pointer' }}
              >
                @{post.User.nickName}
            </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body2" color="text.secondary" onClick={handleExpandClick}>
          {post.answers} Answers
        </Typography>
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