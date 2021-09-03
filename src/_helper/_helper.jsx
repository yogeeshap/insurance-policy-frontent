import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStylesFacebook = makeStyles((theme) => ({

  root:(props)=> ({
    position: 'absolute',
    textAlign:'center',
    top:props.end === 'true'?'20%':'50%',
    left:props.end === 'true'?'95%':'50%',
  }),
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

function FacebookCircularProgress(props) {
  const classes = useStylesFacebook(props);

  return (
    <div className={classes.root}>
        <div>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
      </div>
      <p>Loading...</p>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CustomizedProgressBars({end}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FacebookCircularProgress end={end}/>
    </div>
  );
}
