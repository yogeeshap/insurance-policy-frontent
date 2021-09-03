import {React,useCallback} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton,InputAdornment, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from "lodash";
import useHttp from '../../hooks/use-http';
import { getPolicyDetails} from '../../api/api';
import { useEffect } from 'react';
import { useContext } from 'react';
import { PolicyContext } from '../../store/context';
import CustomizedProgressBars from '../../_helper/_helper';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        '&.MuiAppBar-colorPrimary':{
            backgroundColor:'#fff'
        }
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    searchBar:{
      height:'3rem',
      width:'50ch'
    },
    toolbar:{
      display:'flex',
      // justifyContent:'space-between'
    }
        
}))

const Header = ({open,handleDrawerOpen}) =>{
    const classes = useStyles();
    const policyCtx =  useContext(PolicyContext)
    const {sendRequest,data:policyData,error:errorMsg,status} = useHttp(getPolicyDetails,true)
    const debouncedSearchResults = useCallback(debounce(sendRequest, 2000), [sendRequest]);

    const handleSearch = (event) =>{
      policyCtx.setStatusValue('pending')
      debouncedSearchResults({query:event.target.value})
      policyCtx.setPageNum(0)
    }

    useEffect(()=>{
    
      if(errorMsg){
        policyCtx.handleError(errorMsg)
      }
    },[errorMsg])

    useEffect(()=>{
      if(status === 'completed'){
        policyCtx.setStatusValue(status)
      } 
    },[status])

    useEffect(()=>{
      policyCtx.setPolicyDetails(policyData)
      policyCtx.setSearchedValue(policyData?.query)

    },[policyData])

    return <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon fontSize = "large"/>
          </IconButton>
          <OutlinedInput
            id="outlined-adornment-amount"
            placeholder="Search by Customer Id or Policy id"
            className={classes.searchBar}
            onChange={handleSearch}
            endAdornment={
                <InputAdornment 
                    position="end"
                ><SearchIcon 
                    fontSize="large"/>
                    </InputAdornment>
                }
          />
        </Toolbar>
      { policyCtx.loading && <div><CustomizedProgressBars end='true'/></div>}
      </AppBar>
}

export default Header