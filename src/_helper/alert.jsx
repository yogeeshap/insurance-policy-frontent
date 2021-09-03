import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} style={{fontSize:"1.5rem"}}/>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background:'red',
    '& > * + *': {
      marginTop: 0,
      fontSize:'2rem',
      position:'absolute',
      top:0
    },
  },
}));

export default function AlertBox({open,handleClose}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
        <Alert onClose={handleClose} severity="success">
            Successfully Updated!
        </Alert>
      </Snackbar>
    </div>
  );
}
