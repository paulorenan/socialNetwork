import React, {useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import MyContext from '../Context';

export default function EditProfile({user, fetch}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [nickName, setNickName] = useState(user.nickName);
  const [loading, setLoading] = useState(false);
  const [nickError, setNickError] = useState(false);
  const { URL, axios, fetchLoad } = useContext(MyContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    if (nickName.includes(' ')) {
      setNickError(true);
    } else {
      if (name.trim() !== '' && nickName.trim() !== '') {
        setLoading(true);
        axios.put(`${URL}users/me`, { name, nickName })
          .then(() => {
            if (nickName !== user.nickName) {
              fetchLoad();
              navigate(`/p/${nickName}`);
            } else {
            fetch();
            fetchLoad();
            setLoading(false);
            setOpen(false);
            setNickError(false);
            }
          }).catch((err) => {
            console.log(err.response);
            setLoading(false);
          });
      }
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{margin: '10px'}}>
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="nickName"
            label="Nickname"
            type="nickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            fullWidth
            variant="standard"
            error={nickError}
            helperText={nickError ? 'Nickname cannot contain spaces' : ''}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleClose} loading={loading}>Cancel</LoadingButton>
          <LoadingButton onClick={handleEdit} loading={loading}>Edit</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
