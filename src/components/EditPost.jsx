import React, { useEffect, useState, useContext } from 'react';
import { Typography, DialogActions, DialogContent, DialogTitle, Dialog, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MyContext from '../Context';

export default function FormDialog({post}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { URL, axios, fetchPosts } = useContext(MyContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (post) {
      if (!open) {
        setContent(post.content);
      }
    }
  }, [post, open]);

  const handleEdit = () => {
    if (content.trim() !== '') {
      setLoading(true);
      axios.put(`${URL}posts/${post.id}`, { content })
        .then(() => {
          setLoading(false);
          fetchPosts();
          setOpen(false);
        }).catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Typography textAlign="center" onClick={handleClickOpen}>
        Edit
      </Typography>
      <Dialog 
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="post-content"
            label="Post"
            type="text"
            fullWidth
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={handleClose}>Cancel</LoadingButton>
          <LoadingButton loading={loading} onClick={handleEdit}>Edit</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
