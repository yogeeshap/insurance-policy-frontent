import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PolicyIcon from '@material-ui/icons/Policy';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      typhography:{
        '& .MuiTypography-body1':{
          fontSize:'1.5rem'
        }
      }
    }))



const SideNav = ({open,handleDrawerClose,d}) =>{
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const handleClick=(targetedRoute) =>{
      history.push(`/${targetedRoute.split(' ')[0].toLowerCase()}`)
    }

    return  <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                })}
                classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
                }}
                >
                <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon fontSize = "large"/> : <ChevronLeftIcon fontSize = "large"/>}
                </IconButton>
                </div>
                <Divider />
                <List>
                {['Dashboard', 'Policy Details'].map((text, index) => (
                    <ListItem button key={text} onClick={e=>handleClick(text)}>
                    <ListItemIcon>{index % 2 === 0 ? <DashboardIcon fontSize = "large"/> : <PolicyIcon fontSize = "large"/>}</ListItemIcon>
                    <ListItemText primary={text}  className={classes.typhography}/>
                    </ListItem>
                ))}
                </List>
                <List>
                </List>
            </Drawer>
  
        }

export default SideNav