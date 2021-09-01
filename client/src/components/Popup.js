import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Container,
  Grid,
} from "@material-ui/core";
import ExerciseForm from "./ExerciseForm";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "./graphql/mutations";
import { ALL_WORKOUTS } from "./graphql/queries";

function AddNewForm(props) {
  const [formOpen, setFormOpen] = useState(false);
  const {
    setMins,
    setHours,
    setComment,
    setDate,
    date,
    excercises,
    setExercises,
  } = props;
  console.log(excercises);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            autoFocus
            margin="dense"
            id="lengthH"
            label="Treenin pituus h"
            type="text"
            fullWidth
            onChange={(e) => setHours(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            autoFocus
            margin="dense"
            id="lengthMin"
            label="Treenin pituus min"
            type="text"
            fullWidth
            onChange={(e) => setMins(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Kommentti"
            type="text"
            fullWidth
            onChange={(e) => setComment(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <TextField
            id="date"
            label="Pvm"
            type="date"
            defaultValue={date}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Button
            onClick={() => setFormOpen(true)}
            variant="contained"
            color="primary"
          >
            Lisää liike
          </Button>
        </Grid>

        {formOpen ? (
          <ExerciseForm
            setFormOpen={setFormOpen}
            excercises={excercises}
            setExercises={setExercises}
          />
        ) : (
          <div></div>
        )}
      </Grid>
    </Container>
  );
}

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

  const [createWorkot] = useMutation(ADD_WORKOUT, {
    refetchQueries: [{ query: ALL_WORKOUTS }],
  });
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);

    const length = parseFloat(`${hours}.${mins}`);
    const date = toRightDate(dateFirst);

    createWorkot({ variables: { length, date, comment, excercises } });

    setMins("");
    setHours("");
    setComment("");
    setDateFirst("");
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
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Peru
        </Button>
        <Button onClick={handleClose} color="primary">
          Valmis
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
