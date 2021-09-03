import React from 'react'
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#f5f5f58c',
    position:'absolute',
    left:'50%',
    right:'50%'
  },
}));

const NoteFound = () =>{
    console.log('error')
    const classes = useStyles();
    return <div className={classes.root}>
        Opps No data.
    </div>
}

export default NoteFound