import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AuthContext } from "../../authContext";

import Date from "../Date/Date";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

interface Hour {
  id: number;
  client: string;
  task: string;
  hours: number;
  date: Date;
  week: string;
}

interface Day {
  day: string;
  tasks: Hour[] | null;
}

const HourList: React.FC = () => {
  const [hours, setHours] = useState<Hour[]>([]);
  const [week, setWeek] = useState<Day[]>([]);
  const [weekNum, setWeekNum] = useState<number | null>(null);
  const isAuthenticated = useContext(AuthContext);

  const classes = useStyles();

  useEffect(() => {
    const getHours = async () => {
      const currentWeek = moment().isoWeek();
      const options = {
        headers: { Authorization: `Token ${isAuthenticated.token}` },
      };
      const resp = await fetch(
        `http://localhost:8000/hours?weeknum=${currentWeek}`,
        options
      );
      const data = await resp.json();
      setHours(data);
      setWeekNum(currentWeek);
      setData(data, currentWeek);
    };
    getHours();
  }, []);

  const setDates = (weekNum: number) => {
    const week = getWeek(weekNum);
    const dates: any = [];
    for (var i = 0; i < week.length; i++) {
      const data: Day = {
        day: week[i],
        tasks: [],
      };
      week.push(data);
    }
    return dates;
  };

  const setData = (data: any, weekNum: number) => {
    // First create week Mon-Sun based on week number value.
    const weekData = setDates(weekNum);

    for (var day = 0; day < weekData.length; day++) {
      for (var k = 0; k < data.length; k++) {
        if (data[k].date === weekData[day].day) {
          const hours: Hour = {
            id: data[k].id,
            client: data[k].client,
            task: data[k].task,
            hours: data[k].hours,
            date: data[k].date,
            week: data[k].week,
          };
          weekData[day].tasks.push(hours);
        }
      }
    }
    setWeek(weekData);
  };

  const getWeek = (week: number) => {
    const curDate = moment();
    const weekStart = curDate.clone().startOf("isoWeek").week(week);
    const days: any = [];

    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
    }
    return days;
  };

  if (!hours && !week) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className={classes.root}>
      <button>Next Week</button>
      <Grid container spacing={0}>
        {week.map((day) => (
          <Date day={day.day} tasks={day.tasks} />
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
  })
);

export default HourList;
