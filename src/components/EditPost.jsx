import React, { useEffect, useState, useContext } from 'react';
import { DialogActions, DialogContent, DialogTitle, Dialog, TextField, MenuItem, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MyContext from '../Context';

export default function EditPost({post, click, fetch}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { URL, axios } = useContext(MyContext);

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
          fetch();
          setOpen(false);
        }).catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <MenuItem onClick={() => {
        handleClickOpen();
        click();
      }}>
        <Typography>
          Edit Post
        </Typography>
      </MenuItem>
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
            id="outlined-multiline-flexible"
            multiline
            maxRows={6}
            variant="outlined"
            fullWidth
            margin="dense"
            label="Post"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={handleClose}>Cancel</LoadingButton>
          <LoadingButton loading={loading} onClick={handleEdit}>Edit</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
