import {React,useState,useEffect,Fragment} from 'react'
import { makeStyles} from '@material-ui/core/styles';
import { Typography ,IconButton} from '@material-ui/core';
import useHttp from '../../hooks/use-http';
import { getPolicyDetails, updatePolicyDetails } from '../../api/api';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CustomizedProgressBars from '../../_helper/_helper';
import NoteFound from '../../_helper/NotFound';
import ErrorBox from '../../_helper/errorBox';
import { PolicyContext } from '../../store/context';
import { useContext } from 'react';
import TextField from "@material-ui/core/TextField";
import { useRef } from 'react';
import { useCallback } from 'react';
import { debounce } from "lodash";
import AlertBox from '../../_helper/alert';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
      },
      paper:{
          // margin:'1rem 0',
          // padding:'1.5rem'
      },
      paperContainer:{
          // paddingTop:'2rem'
      },
      policyHeader:{
          display:'flex',
          justifyContent:'space-between'
      },
      table: {
        minWidth: 650,
        "& .MuiTableCell-root": {
          padding: ".5rem",
          fontSize:'1.3rem'
        },
        '& .MuiTableCell-head':{
          fontWeight:'600',
          fontSize:'1.2rem'
        }
     
      },
      tableContainer: {
        '& > *': {
          borderBottom: 'unset',
        },
      },
      tableRoot: {
        marginTop:'1.5rem',
        '& > *': {
          maxHeight: 700,
        },
      },
      pagination:{
        fontSize:'2rem',
        '& .MuiTypography-body2':{
          fontSize:'1rem'
        }
      },
      textField:{
        '& .MuiFormHelperText-root.Mui-error':{
          fontSize:'1rem'
        }
      }

    }))


function createCustomerData(id,customerId,customerGender,customerIncomeGroup,customerRegion,customerMaritalStatus){
  return {
    id,
    customerId,
    customerGender,
    customerIncomeGroup,
    customerRegion,
    customerMaritalStatus
  }
}

function createData(id,policyId, dateofPurchase, fuel, vehicleSegment, premium, bodilyInjuryLiability, personalInjuryProtection, propertyDamageLiability,colision,comprehensive,customer) {
  return {
    id,
    policyId,
    dateofPurchase,
    fuel,
    vehicleSegment,
    premium,
    bodilyInjuryLiability,
    personalInjuryProtection,
    propertyDamageLiability,
    colision,
    comprehensive,
    customerDetails:createCustomerData(
      customer.id,
      customer.customer_digit,
      customer.customer_gender_status,
      customer.customer_income_group,
      customer.customer_region,
      customer.customer_martial_status,
      ) 
  };
}

const PolicyPage = () =>{
    const {sendRequest,data:policyData,error:errorMsg,status} = useHttp(getPolicyDetails,true)
    const policyCtx =  useContext(PolicyContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openBox, setOpenBox] = useState(false);
    const classes = useStyles();
    
    useEffect(()=>{
 
      if(errorMsg || policyCtx?.error){
        setOpenBox((prevState)=>!prevState)
      }
    },[errorMsg,policyCtx?.error])

    useEffect(()=>{
      policyCtx.setPolicyDetails(policyData)
    },[policyData])

    const rows = policyCtx?.policyDetailsData?.result?.map((p)=>createData(
      p.id,
      p.policy_id,
      p.date_of_purchase,
      p.fuel,
      p.vehicle_segment,
      p.premium,
      p.bodily_injury_liability,
      p.personal_injury_liability,
      p.property_damage_liability,
      p.colision,
      p.comprehensive,
      p.customer
    ))

    useEffect(()=>{
      sendRequest({pageNumber:page,query:policyCtx?.searchedValue})
      
  },[sendRequest,page])

    useEffect(()=>{
      if(!policyCtx.pageValue){
        setRowsPerPage(5)
        setPage(0)
      }
    },[policyCtx.pageValue])

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      policyCtx.setPageNum(newPage)
    };

    const handleClose = () => {
      setOpenBox((prevState)=>!prevState)
      policyCtx.handleError()
    };
 
    if(status === 'completed' && openBox && (errorMsg || policyCtx?.error)){
      return <ErrorBox 
      open={openBox}
      error={policyCtx?.error}
      handleClose={handleClose}
      />
    }

    if(status === 'pending'||policyCtx.status === 'pending'){
      return <CustomizedProgressBars end='false'/>
    }

    if(status === 'completed' && policyData?.data?.length === 0){
      return <NoteFound />
    }

    const handleClosePopUp = (event, newPage) => {
      policyCtx.handleAlert(false)
    };

    return  <main className={classes.content}>
    <h1>Policy Details</h1>
    <AlertBox open={policyCtx.alertPop} handleClose={handleClosePopUp}/>
    <Paper className={classes.tableRoot}>
    <TableContainer className={classes.tableContainer}>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            {[
            'PolicyId',
            'Date of Purchase',
            'Fuel',
            'Vehicle Segment',
            'Premium',
            'Body Injury Liability',
            'Personal Injury Liability',
            'Property Damage Liability',
            'Colision',
            'Comprehensive'
          ].map((t,i)=>i === 0?<TableCell key={i}>{t}</TableCell>:<TableCell key={i} align="left">{t}</TableCell>
          )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row,index) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        className={classes.pagination}
        count={policyCtx?.policyDetailsData?.total_page || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
    </main>
}

const disableField = (field,index,inputRef) => {
  if (field === 'date_of_purchase' && index === 1) return true
}

const EditableTableCell = ({ value,fieldName,index,id,onCellValueChange}) => {
  const inputRef = useRef('')
  const classes = useStyles();
  const policyCtx =  useContext(PolicyContext)

  const handleTextFieldChange = e => {
    onCellValueChange({
      fieldValue: e.target.value,
      fieldName: fieldName
    });
  };

  function maxLengthCheck(fieldName,event) {
    if (+event.target?.value > 1000000 && fieldName === 'premium') event.target.value = event.target.value.slice(0, 6)
  }

  let defaultValue
  try{
    defaultValue = policyCtx.editedValue[id][fieldName]
  }
  catch(err){
    defaultValue = value
    
  }

  return (
    <TableCell align="center">
      <TextField
        key={id+fieldName}
        onChange={handleTextFieldChange}
        inputRef={inputRef}
        id={id+fieldName}
        style={{fontSize:'1rem'}}
        defaultValue={defaultValue===undefined?value:defaultValue}
        margin="normal"
        variant="outlined"
        onInput={maxLengthCheck.bind(this,fieldName)}
        className={classes.textField}
        inputProps={{
            readOnly:disableField(fieldName,index,inputRef),
        }}
      />
    </TableCell>
  );
};

function Row(props) {
  const { row} = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const {sendRequest,error:errorMsg,status} = useHttp(updatePolicyDetails)
  const policyCtx =  useContext(PolicyContext)

  useEffect(()=>{
    if(status === 'pending') policyCtx.onLoading(true)
    if(status === 'completed') policyCtx.onLoading(false)
    if(status === 'completed' && !errorMsg) policyCtx.handleAlert(true)
  },[status,errorMsg])

  useEffect(()=>{
    
    if(errorMsg){
     
        policyCtx.handleError(errorMsg)
        policyCtx.clearEdit({})
    }
  },[errorMsg])

  const debouncedSearchResults = useCallback(debounce(sendRequest, 2000), [sendRequest]);
  const handleTextFieldChange=(id,index,change) =>{
    const key = change.fieldName
    debouncedSearchResults({[key]:change.fieldValue,id});

    policyCtx.handleEdit(id,index,change)
    
  }

  return (
    <Fragment>
      <TableRow className={classes.tableRoot}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {[
          {
            value:row.policyId,
            name:'policy_id'
          },
          {
            value:row.dateofPurchase,
            name:'date_of_purchase'
          },
          {
            value:row.fuel,
            name:'fuel'
          },
          {
            value:row.vehicleSegment,
            name:'vehicle_segment'
          },
          {
            value:row.premium,
            name:'premium'
          },
          {
            value:row.bodilyInjuryLiability,
            name:'bodily_injury_liability'
          },
          {
            value:row.personalInjuryProtection,
            name:'personal_injury_liability'
          },
          {
            value:row.propertyDamageLiability,
            name:'property_damage_liability'
          },
          {
            value:row.colision,
            name:'colision'
          },
          {
            value:row.comprehensive,
            name:'comprehensive'
          }
        ].map((t,i)=><EditableTableCell
          key={i}
          value={t.value}
          fieldName={t.name}
          index={i}
          id={row.id}
          onCellValueChange={handleTextFieldChange.bind(this,row.id,i)}
        />
          )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(row).length}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div" style={{fontWeight:600}}>
                Customer
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  {[          
                    'Customer Id',
                    'Customer Gender',
                    'Customer Income Group',
                    'Customer Region',
                    'Customer Marital Status',
                  ].map((t,i)=><TableCell key={i} align="center">{t}</TableCell>
                  )}
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow> 
                 { [
                    {
                      value:row.customerDetails.customerId,
                      name:'customer_digit'
                    },
                     {
                      value:row.customerDetails.customerGender,
                      name:'customer_gender_status'
                    },
                     {
                      value:row.customerDetails.customerIncomeGroup,
                      name:'customer_income_group'
                    },
                     {
                      value:row.customerDetails.customerRegion,
                      name:'customer_region'
                    },
                     {
                      value:row.customerDetails.customerMaritalStatus,
                      name:'customer_martial_status'
                    },
                  ].map((c,i)=><EditableTableCell
                    key={i}
                    value={c.value}
                    fieldName={c.name}
                    index={i}
                    id={row.customerDetails.id}
                    onCellValueChange={handleTextFieldChange.bind(this,row.customerDetails.id,i)}
                    />
                  )}
                    </TableRow>     
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default PolicyPage