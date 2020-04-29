import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AuthContext } from "../../authContext";
import { getWeek } from "../../utils";
import { IHour, IDay } from "../../types";

import Date from "../Date/Date";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";

const HourList: React.FC = () => {
  const [week, setWeek] = useState<IDay[]>([]);
  const [weekNum, setWeekNum] = useState<number>(moment().isoWeek());
  const isAuthenticated = useContext(AuthContext);
  const [loading, setIsLoading] = useState<boolean>(true);

  const classes = useStyles();

  useEffect(() => {
    const getHours = async () => {
      const options = {
        headers: { Authorization: `Token ${isAuthenticated.token}` },
      };
      const resp = await fetch(
        `http://localhost:8000/hours?weeknum=${weekNum}`,
        options
      );
      const data = await resp.json();
      setData(data, weekNum);
      setIsLoading(false);
    };
    getHours();
  }, [weekNum]);

  const removeElement = (itemIdx: number): void => {
    const test: IDay[] = week;
    test?.forEach(
      (tas) => (tas.tasks = tas.tasks!.filter((task) => task.id !== itemIdx))
    );
    setWeek([...test]);
  };

  const setData = (data: any, weekNum: number): void => {
    // First create week Mon-Sun based on week number value.
    const week = getWeek(weekNum);
    const weekData: IDay[] = [];
    for (let i = 0; i < week.length; i++) {
      const data: IDay = {
        day: week[i],
        tasks: [],
      };
      weekData.push(data);
    }

    for (let day = 0; day < weekData.length; day++) {
      for (let k = 0; k < data.length; k++) {
        const { id, client, task, hours, date, week } = data[k];
        if (data[k].date === weekData[day].day) {
          const hour: IHour = {
            id,
            client,
            task,
            hours,
            date,
            week,
          };
          weekData[day].tasks!.push(hour);
        }
      }
    }
    setWeek(weekData);
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        justify="flex-end"
        className={classes.buttonbar}
      >
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={() => setWeekNum(weekNum! - 1)}>
            Previous Week
          </Button>
          <Button onClick={() => setWeekNum(weekNum! + 1)}>Next Week</Button>
        </ButtonGroup>
      </Grid>

      <Grid container spacing={1}>
        {week.map((day, idx) => (
          <Date
            key={idx}
            day={day.day}
            tasks={day.tasks}
            removeElement={removeElement}
          />
        ))}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
    },
    buttonbar: {
      marginTop: 10,
      marginBottom: 15,
    },
  })
);

export default HourList;
