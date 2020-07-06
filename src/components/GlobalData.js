import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

const useStylesTypo = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
  });

export default function GlobalData() {

   const [ globalData, setGlobalData ] = useState();
   const [dataLoading, setDataLoading ] = useState(false);

   useEffect(() => {
       async function fetchGlobalData(){
          setDataLoading(true);
          const apiResponse = await fetch('https://api.thevirustracker.com/free-api?global=stats');
          console.log(apiResponse);
          const dataFromApi = await apiResponse.json();
          console.log(dataFromApi);
          setGlobalData(dataFromApi);
          setDataLoading(false);
       }
       fetchGlobalData();
   },[]);

  const classes = useStyles();
  const classesTypo = useStylesTypo();

  const loading = 'Loading....';

  if(dataLoading){
     return(
      <div className={classes.root}>
      <Paper elevation={3}>
         <div className={classesTypo.root}>       
          <Typography variant="h4" gutterBottom style={ { color:'blue', fontWeight:'bold' } }>
             {loading}
          </Typography>
          <Typography variant="subtitle2" gutterBottom style={ { color:'blue' } }>
             Total Cases
          </Typography>
          </div>
      </Paper>

      <Paper elevation={3}>
        <div className={classesTypo.root}>
          <Typography variant="h4" gutterBottom style={ { color:'orange', fontWeight:'bold' } }>
          {loading}
          </Typography>
          <Typography variant="subtitle2" gutterBottom style={ { color:'orange' } }>
            Active
          </Typography>
         </div>
      </Paper>

      <Paper elevation={3}>
         <div className={classesTypo.root}>
          <Typography variant="h4" gutterBottom style={ { color:'green', fontWeight:'bold' } }>
          {loading}
          </Typography>
          <Typography variant="subtitle2" gutterBottom style={ { color:'green' } }>
             Recovered
          </Typography>
         </div> 
      </Paper>

      <Paper elevation={3}>
         <div className={classesTypo.root}> 
          <Typography variant="h4" gutterBottom style={ { color:'red', fontWeight:'bold' } }>
          {loading}
          </Typography>
          <Typography variant="subtitle2" gutterBottom style={ { color:'red' } }>
             Deaths
          </Typography>
         </div> 
      </Paper>
   </div>
     );
  }

  return (
    <div className={classes.root}>
       <Paper elevation={3}>
          <div className={classesTypo.root}>       
           <Typography variant="h4" gutterBottom style={ { color:'blue', fontWeight:'bold' } }>
           <NumberFormat value={globalData && globalData.results && globalData.results[0].total_cases} displayType={'text'} thousandSeparator={true}/>
           </Typography>
           <Typography variant="subtitle2" gutterBottom style={ { color:'blue' } }>
              Total Cases
           </Typography>
           </div>
       </Paper>

       <Paper elevation={3}>
         <div className={classesTypo.root}>
           <Typography variant="h4" gutterBottom style={ { color:'orange', fontWeight:'bold' } }>
           <NumberFormat value={globalData && globalData.results && globalData.results[0].total_new_cases_today + globalData && globalData.results && globalData.results[0].total_active_cases + globalData && globalData.results && globalData.results[0].total_unresolved} displayType={'text'} thousandSeparator={true}/>
           </Typography>
           <Typography variant="subtitle2" gutterBottom style={ { color:'orange' } }>
             Active
           </Typography>
          </div>
       </Paper>

       <Paper elevation={3}>
          <div className={classesTypo.root}>
           <Typography variant="h4" gutterBottom style={ { color:'green', fontWeight:'bold' } }>
           <NumberFormat value={globalData && globalData.results && globalData.results[0].total_recovered} displayType={'text'} thousandSeparator={true}/>
           </Typography>
           <Typography variant="subtitle2" gutterBottom style={ { color:'green' } }>
              Recovered
           </Typography>
          </div> 
       </Paper>

       <Paper elevation={3}>
          <div className={classesTypo.root}> 
           <Typography variant="h4" gutterBottom style={ { color:'red', fontWeight:'bold' } }>
           <NumberFormat value={globalData && globalData.results && globalData.results[0].total_deaths} displayType={'text'} thousandSeparator={true}/>
           </Typography>
           <Typography variant="subtitle2" gutterBottom style={ { color:'red' } }>
              Deaths
           </Typography>
          </div> 
       </Paper>
    </div>
  );
}
