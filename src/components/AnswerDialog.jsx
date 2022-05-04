import React, { useState, useEffect, useContext } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CardForAnswer from './CardForAnswer';
import MyContext from '../Context';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ScrollDialog(props) {
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [firstExpanded, setFirstExpanded] = useState(false);
  const { URL, auth, token, axios } = useContext(MyContext);
  const { post, expanded, set } = props


  useEffect(() => {
    if (expanded && !firstExpanded) {
      setLoading(true)
      axios.get(`${URL}answers/${post.id}`)
      .then(res => {
        setAnswers(res.data)
        set(res.data.length)
        setLoading(false)
        setFirstExpanded(true)
      })
    } else if (expanded) {
      axios.get(`${URL}answers/${post.id}`)
      .then(res => {
        setAnswers(res.data)
        set(res.data.length)
        setLoading(false)
      })
    }
  }, [post.id, URL, expanded, axios, firstExpanded, set])

  const fetchAnswers = () => {
    axios.get(`${URL}answers/${post.id}`)
      .then(res => { 
        setAnswers(res.data) 
        set(res.data.length)
      })
  }


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
      {loading && 
        <LoadingButton loading={loading} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <SendIcon />
        </LoadingButton>}
      {answers.map(answer => (
        <CardForAnswer key={answer.id} post={answer} fetch={fetchAnswers} />
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
