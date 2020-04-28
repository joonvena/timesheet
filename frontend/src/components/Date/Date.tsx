import React, { useContext } from "react";

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';

interface Hour {
    id: number;
    client: string;
    task: string;
    hours: number;
    date: Date;
    week: string;
  }

interface IProps {
    day: string;
    tasks: Hour[] | null;
}

const Date: React.FC<IProps> = ({ day, tasks }) => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Grid item xs={12}>
            <Paper className={classes.paper}>{day}</Paper>
        </Grid>
    </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default Date;
