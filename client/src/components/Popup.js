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
  const [commentError, setCommentError] = useState({ value: false, text: "" });
  const [hourError, setHourError] = useState({ value: false, text: "" });
  const [minError, setMinError] = useState({ value: false, text: "" });

  const {
    setMins,
    setHours,
    setComment,
    setDate,
    date,
    excercises,
    setExercises,
  } = props;

  const handleHours = (e) => {
    if (
      e.target.value.match(/^[0-9]+$/) === null &&
      e.target.value.length > 0
    ) {
      setHourError({ value: true, text: "Ei voi sisältää kirjaimia" });
      return;
    }
    setHours(e.target.value);
    setHourError({ value: false, text: "" });
  };

  const handleMins = (e) => {
    if (
      e.target.value.match(/^[0-9]+$/) === null &&
      e.target.value.length > 0
    ) {
      setMinError({ value: true, text: "Ei voi sisältää kirjaimia" });
      return;
    }
    setMins(e.target.value);
    setMinError({ value: false, text: "" });
  };

  const handleCommentChange = (e) => {
    if (e.target.value.length > 149) {
      console.log("yli 5");
      setCommentError({
        value: true,
        text: "Kommentin oltava alle 150 merkkiä",
      });

      return;
    } else {
      setCommentError({ value: false, text: "" });
    }

    setComment(e.target.value);
  };
  console.log(excercises);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            autoFocus
            error={hourError.value}
            helperText={hourError.text}
            margin="dense"
            color="secondary"
            id="lengthH"
            label="Treenin pituus h"
            type="text"
            fullWidth
            inputProps={{ maxLength: 2 }}
            onChange={(e) => handleHours(e)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            autoFocus
            error={minError.value}
            helperText={minError.text}
            margin="dense"
            color="secondary"
            id="lengthMin"
            label="Treenin pituus min"
            type="text"
            fullWidth
            inputProps={{ maxLength: 2 }}
            onChange={(e) => handleMins(e)}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            error={commentError.value}
            helperText={commentError.text}
            color="secondary"
            autoFocus
            margin="dense"
            id="comment"
            label="Kommentti"
            type="text"
            fullWidth
            inputProps={{ maxLength: 150 }}
            onChange={(e) => handleCommentChange(e)}
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
  const handleSave = () => {
    setOpen(false);

    const length = parseFloat(`${hours}.${(mins / 60) * 100}`);
    const date = toRightDate(dateFirst);

    createWorkot({ variables: { length, date, comment, excercises } });

    setMins("");
    setHours("");
    setComment("");
    setDateFirst(d.toISOString().split("T")[0]);
    setExercises([]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(comment);
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
        <Button onClick={handleSave} color="primary">
          Valmis
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
