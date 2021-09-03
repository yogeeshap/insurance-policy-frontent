import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import WarningIcon from '@material-ui/icons/Warning';

import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#f5f5f58c',
    flexDirection:'column',
    alignItems:'center'
  },
}));

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function ErrorBox({open,handleClose,error}) {
    const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        className = {classes.root}
      >
        <DialogTitle style={{ cursor: 'move' ,textAlign:'center'}} id="draggable-dialog-title">
          <WarningIcon fontSize='large'/>
          <p>Oh Snap!</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions className= {classes.root}>
          <Button  onClick={handleClose} color="primary" variant="contained">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
