import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function PetInfoDashboard(props) {
  console.log(props)
  return (
    <Paper >
    <Typography component="p">

      {props.petInfo}
    </Typography>
  </Paper>
  )
}