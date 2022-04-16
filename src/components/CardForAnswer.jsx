import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import isMoment from 'moment';
import MyContext from '../Context';

export default function CardForAnswer(props) {
  const { post } = props;
  const [ showMore, setShowMore ]  = React.useState(false);
  const { user, auth } = React.useContext(MyContext);
  
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ fontWeight: 'bold' }}>{post.user.name}</Box>
            <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).fromNow()}</Box>
          </Box>
        } 
        subheader={`@${post.user.nickName}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
    </Box>
  )
}