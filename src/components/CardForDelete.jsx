import React, { useState, useEffect } from 'react';
import { CardHeader, CardContent,Avatar, Box } from '@mui/material/';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import isMoment from 'moment';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export default function CardForDelete({ post }) {
  const [moment, setMoment] = useState('');

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
      setMoment(isMoment(post.createdAt).format('ll'))
    } else {
      setMoment(isMoment(post.createdAt).fromNow())
    }
  }, [post.createdAt])

  return (
    <Box 
      sx={{ maxWidth: 600, minWidth: 200, borderTop: '1px solid #e0e0e0', margin: 1 }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="user"
            src={post.user.image}
          >
            {post.user.name[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              {post.user.name}
            </Box>
            <Box sx={{ ml: 1 }}>{moment}</Box>
          </Box>
        } 
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <Box>
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
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, marginTop: '1rem' }}>
            <img src={post.image} alt="post" className='postImage'/>
          </Box>
        }
      </CardContent>
    </Box>
  )
}