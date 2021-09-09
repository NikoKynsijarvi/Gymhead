import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  workoutContext: {
    flex: 1,
  },
});

const months = [
  { id: 0, name: "Tammikuuta" },
  { id: 1, name: "Helmikuuta" },
  { id: 2, name: "Maaliskuuta" },
  { id: 3, name: "Huhtikuuta" },
  { id: 4, name: "Toukokuuta" },
  { id: 5, name: "Kesäkuuta" },
  { id: 6, name: "Heinäkuuta" },
  { id: 7, name: "Elokuuta" },
  { id: 8, name: "Syyskuuta" },
  { id: 9, name: "Lokakuuta" },
  { id: 10, name: "Marraskuuta" },
  { id: 11, name: "Joulukuuta" },
];

function LastWorkout({ workout }) {
  const classes = useStyles();
  if (!workout) {
    return <h1>Ei vielä harjoituksia</h1>;
  }
  const date = workout.date.split(".");
  const month = months.find((m) => m.id === Number.parseInt(date[1]) - 1);
  const workoutLength = `${workout.length}`.split(".");
  if (workoutLength.length === 1) {
    workoutLength.push(0);
  }
  console.log(workoutLength);

  return (
    <>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        Viimeisin treeni
      </Typography>
      <Typography component="p" variant="h4">
        {workoutLength[0]} h{" "}
        {Math.round((parseFloat(workoutLength[1]) * 60) / 100)} min
      </Typography>
      <Typography color="textSecondary" className={classes.workoutContext}>
        {date[0]} {month.name} {date[2]}
      </Typography>
      <Typography color="textPrimary" className={classes.workoutContext}>
        {workout.comment}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Katso treeni
        </Link>
      </div>
    </>
  );
}

export default LastWorkout;
