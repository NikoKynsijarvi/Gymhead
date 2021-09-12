import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";

import AddNewForm from "./AddNewForm";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "./graphql/mutations";
import { ALL_WORKOUTS } from "./graphql/queries";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

function toRightDate(date) {
  const a = date.split("-");
  return `${a[2]}.${a[1]}.${a[0]}`;
}

function Popup(props) {
  const d = new Date();
  const [mins, setMins] = useState(0);
  const [hours, setHours] = useState(0);
  const [comment, setComment] = useState("");
  const [dateFirst, setDateFirst] = useState(d.toISOString().split("T")[0]);
  const [excercises, setExercises] = useState([]);
  const classes = useStyles();
  const [createWorkot] = useMutation(ADD_WORKOUT, {
    refetchQueries: [{ query: ALL_WORKOUTS }],
  });
  const { open, setOpen } = props;
  const handleSave = () => {
    setOpen(false);
    const length = parseFloat(`${hours}.${(mins / 60) * 100}`);
    const date = toRightDate(dateFirst);

    createWorkot({ variables: { length, date, comment, excercises } });

    setMins(0);
    setHours(0);
    setComment("");
    setDateFirst(d.toISOString().split("T")[0]);
    setExercises([]);
  };

  const handleClose = () => {
    setOpen(false);
    setExercises([]);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <AddNewForm
          setHours={setHours}
          setMins={setMins}
          setComment={setComment}
          setDate={setDateFirst}
          date={dateFirst}
          excercises={excercises}
          setExercises={setExercises}
        />
      </DialogContent>

      <Grid container>
        {excercises.map((e) => (
          <Grid item lg={12} xs={12} key={e.id}>
            <Paper className={classes.paper}>
              <Typography>{e.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Peru
        </Button>
        <Button onClick={handleSave} color="primary">
          Valmis
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
