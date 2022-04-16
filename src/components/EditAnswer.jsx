import React, { useEffect, useState, useContext } from 'react';
import { DialogActions, DialogContent, DialogTitle, Dialog, TextField, MenuItem, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MyContext from '../Context';

export default function EditAnswer({answer, click, fetch}) {
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
    if (answer) {
      if (!open) {
        setContent(answer.content);
      }
    }
  }, [answer, open]);

  const handleEdit = () => {
    if (content.trim() !== '') {
      setLoading(true);
      axios.put(`${URL}answers/${answer.id}`, { content })
        .then(() => {
          fetch();
          setLoading(false);
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
          Edit Comment
        </Typography>
      </MenuItem>
      <Dialog 
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
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