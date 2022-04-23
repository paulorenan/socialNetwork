import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import CardForFollow from './CardForFollow';
import { Box } from '@mui/material';

export default function FollowDialog({ followers, loading, name }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

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

  return (
    <Box sx={{ marginLeft: '15px' }}>
      <LoadingButton onClick={handleClickOpen('paper')} loading={loading}>
        {followers.length} {name}
      </LoadingButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth={true}
      >
        <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {name === 'Followers' ? 
            followers.map(follower => (
              <CardForFollow key={follower.followerId} user={follower.follower} />
            )) :
            followers.map(follower => (
              <CardForFollow key={follower.userId} user={follower.user} />
            ))
          }
          {followers.length === 0 && <p>No {name}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
