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
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [nickError, setNickError] = useState(false);
  const [nickErrorText, setNickErrorText] = useState('Nickname cannot contain spaces');
  const { URL, axios } = useContext(MyContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user.image) {
      setImage(user.image);
    }
  }, [user]);

  const handleEdit = () => {
    if (nickName.includes(' ')) {
      setNickError(true);
    } else {
      if (name.trim() !== '' && nickName.trim() !== '') {
        setLoading(true);
        axios.put(`${URL}users/me`, { name, nickName, image })
          .then(() => {
            if (nickName !== user.nickName) {
              navigate(`/p/${nickName}`);
            } else {
            fetch();
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
            helperText={nickError ? nickErrorText : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            variant="standard"
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
