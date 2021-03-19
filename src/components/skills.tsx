import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { IAllSkillsRow } from '../interfaces/skills';

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

type Props = {
  skills: IAllSkillsRow;
}


export const skills: React.FC<Props> = ({skills}) => {
    const classes = UseStyles();

  return (
    <div id={skills.data?._id} className={classes.root}>
       <Box margin={6}>
        <Grid container spacing={2}>
        {skills.data?.header.map((item) => (
            <React.Fragment>
              <Grid item xs={12} sm={3} className={classes.description}>
                {item.name}
              </Grid>
              <Grid item xs={12} sm={1}>
                {item.value}
              </Grid>
              <Grid item xs={12} sm={8}>
                <LinearProgress className={classes.progress} variant="determinate" value={item.percentage} />
              </Grid>
            </React.Fragment>
          ))
          }
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h6" gutterBottom component="div">
              Post Apocalyptic Highway
            </Typography>
          </Grid>
          {skills.data?.items.filter(item => item.from === "PostApocalypticHighway").map((item) => (
            <React.Fragment>
              <Grid item xs={12} sm={6}>
              {`${item.order} ${item.name}` }
              </Grid>
              <Grid item xs={12} sm={3}>
              {`${item.P ? 'P' : ' '} ${item.R ? 'R' : ' '} ${item.W ? 'W' : ' '} ${item.F ? 'F' : ' '}` }
              </Grid>
              <Grid item xs={12} sm={1}>
                linea
              </Grid>
              <Grid item xs={12} sm={1}>
              {item.time}
              </Grid>
              <Grid item xs={12} sm={1}>
              {item.score}
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
          <Typography variant="h6" className={classes.title} gutterBottom component="div">
              Costa Rican Caves
            </Typography>
          </Grid>
          {skills.data?.items.filter(item => item.from === "CostaRicaCaves").map((item) => (
            <React.Fragment>
              <Grid item xs={12} sm={6}>
              {`${item.order} ${item.name}` }
              </Grid>
              <Grid item xs={12} sm={3}>
              {`${item.P ? 'P' : ' '} ${item.R ? 'R' : ' '} ${item.W ? 'W' : ' '} ${item.F ? 'F' : ' '}` }
              </Grid>
              <Grid item xs={12} sm={1}>
                linea
              </Grid>
              <Grid item xs={12} sm={1}>
              {item.time}
              </Grid>
              <Grid item xs={12} sm={1}>
              {item.score}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

    </Box>
    </div>
  );
};

export default skills;