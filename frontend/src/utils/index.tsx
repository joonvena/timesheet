import moment from "moment";

export const getWeek = (week: number) => {
  const curDate = moment();
  const weekStart = curDate.clone().startOf("isoWeek").week(week);
  const days: any = [];

  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
  }
  return days;
};
