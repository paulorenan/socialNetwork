import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import { Box, TextField } from '@mui/material';
import isMoment from 'moment';
import CardForAnswer from './CardForAnswer';
import axios from 'axios';
import MyContext from '../Context';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import SendIcon from '@mui/icons-material/Send';

export default function ScrollDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [answers, setAnswers] = React.useState([]);
  const [answer, setAnswer] = React.useState('');
  const { URL, auth, token } = React.useContext(MyContext);
  const { post, expanded } = props

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  React.useEffect(() => {
    if (expanded) {
    axios.get(`${URL}answers/${post.id}`)
      .then(res => {
        setAnswers(res.data)
      })
    }
  }, [post.id, URL, expanded])

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.defaults.headers.common['Authorization'] = token;
    if(answer.trim() !== '') {
      axios.post(`${URL}answers`, {
        postId: post.id,
        content: answer
      }).then(() => {
          getAnswers()
          setAnswer('')
        }).catch(err => {
          console.log(err)
        })
    }
    setAnswer('')
  }

  const getAnswers = async () => {
    axios.get(`${URL}answers/${post.id}`)
      .then(res => {
        setAnswers(res.data)
      })
  }

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      {answers.map(answer => (
        <CardForAnswer key={answer.id} post={answer} />
      ))}
      {auth &&
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderTop: '1px solid #e0e0e0' }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Write your comment"
            inputProps={{ 'aria-label': 'write your comment' }}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="send">
            <SendIcon />
          </IconButton>
        </Paper>
      }
    </Collapse>
  );
}
