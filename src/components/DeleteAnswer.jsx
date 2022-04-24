import React, { useState, useContext } from 'react';
import { Typography, DialogActions, DialogContent, DialogTitle, Dialog, DialogContentText, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MyContext from '../Context';
import CardForDelete from '../components/CardForDelete';

export default function DeleteAnswer({ answer, click, fetch }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { URL, axios } = useContext(MyContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`${URL}answers/${answer.id}`)
      .then(() => {
        fetch();
        setLoading(false);
        setOpen(false);
      }).catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <MenuItem onClick={() => {
        handleClickOpen();
        click();
      }}>
        <Typography>
          Delete Comment
        </Typography>
      </MenuItem>
      <Dialog 
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment?
          </DialogContentText>
          <CardForDelete post={answer} />
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={handleClose}>Cancel</LoadingButton>
          <LoadingButton loading={loading} onClick={handleDelete}>Delete</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}