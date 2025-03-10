import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({title, children, open = false, onClose}) {

  const handleClose = answer => {
    onClose(answer);
  };

  return (
    <div>
      <Dialog 
      open={open} 
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-description">
            {title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {children}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose(true)}>OK</Button>
          <Button onClick={() => handleClose(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}