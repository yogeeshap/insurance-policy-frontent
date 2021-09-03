
import {React} from 'react'
import Chart from 'react-apexcharts'
import { makeStyles} from '@material-ui/core/styles';
import { useEffect } from 'react';
import { monthWisePolicy } from '../../api/api';
import useHttp from '../../hooks/use-http';
import CustomizedProgressBars from '../../_helper/_helper';
import NoteFound from '../../_helper/NotFound';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width:'100%',
      flexDirection:'column',
      overflow:'hidden',
    },
    chart:{
        maxWidth:'110rem',
        marginTop:'5rem',
        overflow:'hidden',
        '& .apexcharts-toolbar':{
           display:'none' ,
    },
  
}
  }));
  
const LinChart  = () => {
    const classes = useStyles();
    const {sendRequest,data:policyData,status} = useHttp(monthWisePolicy,true)

    useEffect(()=>{
      sendRequest()
    },[sendRequest])

    const lineChartState = {
      
        series: [{
            name: "Policy",
            data: policyData?.data?.result?.map(e=>e.number_of_policy)
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Number of Policy by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
          }
        },
      
      
      };

      if(status === 'pending'){
        return <CustomizedProgressBars/>
      }
  
      if(status === 'completed' && policyData?.data.result?.length === 0){
        return <NoteFound />
      }
      
      return <div id="chart" className={classes.root}>
            <h1 className={classes.header}>Dashboard</h1>
                <Chart 
                    className={classes.chart}
                    options={lineChartState.options} 
                    series={lineChartState.series} 
                    type="line" height={350} 
                    />
            </div>
 }

export default LinChart

