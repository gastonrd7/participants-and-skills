import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const UseStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    progress: {
      width: '70%',
      height: 10
    },
    title: {
      marginTop: 25,
      color: '#526d99',
    },
    description: {
      color: '#7f7f7f',
      fontWeight: 'bold'
    }
  }));

export default function skills() {
    const classes = UseStyles();

  return (
    <div className={classes.root}>
       <Box margin={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} className={classes.description}>
            STRENGHT
          </Grid>
          <Grid item xs={12} sm={1}>
            12
          </Grid>
          <Grid item xs={12} sm={8}>
            <LinearProgress className={classes.progress} variant="determinate" value={70} />
          </Grid>
        </Grid>
   
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} className={classes.description}>
            STRENGHT
          </Grid>
          <Grid item xs={12} sm={1}>
            8
          </Grid>
          <Grid item xs={12} sm={8}>
            <LinearProgress className={classes.progress} variant="determinate" value={50} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h6" gutterBottom component="div">
              Post Apocalyptic Highway
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
          1 Hill Climb
          </Grid>
          <Grid item xs={12} sm={3}>
            P R W F 
          </Grid>
          <Grid item xs={12} sm={1}>
            linea
          </Grid>
          <Grid item xs={12} sm={1}>
            00:17:35
          </Grid>
          <Grid item xs={12} sm={1}>
            5
          </Grid>
          <Grid item xs={12} sm={6}>
          1 Hill Climb
          </Grid>
          <Grid item xs={12} sm={3}>
            P R W F 
          </Grid>
          <Grid item xs={12} sm={1}>
            linea
          </Grid>
          <Grid item xs={12} sm={1}>
            00:17:35
          </Grid>
          <Grid item xs={12} sm={1}>
            5
          </Grid>
          <Grid item xs={12}>
          <Typography variant="h6" className={classes.title} gutterBottom component="div">
              Costa Rican Caves
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            1 Hill Climb
          </Grid>
          <Grid item xs={12} sm={3}>
            P R W F 
          </Grid>
          <Grid item xs={12} sm={1}>
            linea
          </Grid>
          <Grid item xs={12} sm={1}>
            00:17:35
          </Grid>
          <Grid item xs={12} sm={1}>
            6
          </Grid>
        </Grid>

    </Box>
    </div>
  );
}