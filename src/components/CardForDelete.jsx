import * as React from 'react';
import { CardHeader, CardContent,Avatar, Box } from '@mui/material/';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import isMoment from 'moment';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export default function CardForDelete({ post }) {
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
            <Box sx={{ ml: 1 }}>{isMoment(post.createdAt).fromNow()}</Box>
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