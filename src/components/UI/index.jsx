import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './header';
import SideNav from './sideNav';
import PolicyContextProvider from '../../store/context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#f5f5f58c',
    padding:'8rem 3rem 3rem 3rem',
    height:'100vh'
  },
}));

export default function MainUi({props,children}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <PolicyContextProvider>
      <CssBaseline />
        <Header 
            handleDrawerOpen={handleDrawerOpen}
            open={open}
            />
        <SideNav
           handleDrawerClose={handleDrawerClose}
           handleDrawerOpen={handleDrawerOpen}
           open={open}
        />
        {children}
        </PolicyContextProvider>
    </div>
  );
}
