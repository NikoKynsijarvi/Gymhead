import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function createDataArray(days, workouts, m) {
  console.log(workouts);
  const data = [];
  for (let i = 1; i <= days; i++) {
    const a = workouts.filter((w) => {
      const date = w.date.split(".");
      if (Number.parseInt(date[0]) === i) {
        return w;
      }
      return false;
    });
    if (a.length > 0) {
      data.push({ date: a[0].date, length: a[0].length });
    } else {
      data.push({ date: `${i}.${m + 1}`, length: undefined });
    }
  }
  return data;
}

function Chart({ workouts }) {
  var d = new Date();
  var n = d.getMonth();
  var y = d.getFullYear();

  let dInMonth = daysInMonth(n, y);
  const thisMonth = workouts.filter((m) => {
    const date = m.date.split(".");
    if (Number.parseInt(date[1]) === n + 1) {
      return m;
    }
    return false;
  });

  const dataA = createDataArray(dInMonth, thisMonth, n);

  const theme = useTheme();
  return (
    <>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        Kuukauden treenimäärä
      </Typography>
      <ResponsiveContainer width="90%">
        <BarChart
          data={dataA}
          margin={{
            top: 16,
            right: 0,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis />
          <Tooltip />
          <Bar
            type="monotone"
            dataKey="length"
            fill={theme.palette.primary.main}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;
