import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Container,
  Grid,
  MenuItem,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded";

const useStyles = makeStyles((theme) => ({
  addIcon: {
    height: "45px",
    width: "45px",
  },
}));

const exerciseNames = [
  "Penkkipunnerrus",
  "Jalkakyykky",
  "Maastaveto",
  "Hauiskääntö",
  "Kulmasoutu",
];

function ExerciseForm(props) {
  const classes = useStyles();
  const { setFormOpen } = props;
  const handleClose = () => {
    setFormOpen(false);
  };
  return (
    <>
      <Grid item xs={6} md={6} lg={6}>
        <TextField
          autoFocus
          select
          margin="dense"
          id="eName"
          label="Liike"
          fullWidth
          defaultValue=""
        >
          {exerciseNames.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <TextField
          autoFocus
          margin="dense"
          id="eSets"
          label="Sarjat"
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <TextField
          autoFocus
          margin="dense"
          id="eSets"
          label="Toistot"
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} md={4} lg={4}>
        <TextField
          autoFocus
          margin="dense"
          id="eWeight"
          label="Paino kg"
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <IconButton color="secondary" onClick={handleClose}>
          <AddCircleOutlineRounded className={classes.addIcon} />
        </IconButton>
      </Grid>
    </>
  );
}

function AddNewForm(props) {
  const [formOpen, setFormOpen] = useState(false);
  const { setMins, setHours, setComment, setDate, date } = props;

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

        {formOpen ? <ExerciseForm setFormOpen={setFormOpen} /> : <div></div>}
      </Grid>
    </Container>
  );
}

function Popup(props) {
  const d = new Date();
  const [mins, setMins] = useState(null);
  const [hours, setHours] = useState(null);
  const [comment, setComment] = useState(null);
  const [date, setDate] = useState(d.toISOString().split("T")[0]);
  const [workouts, setWorkout] = useState([
    {
      length: 1.3,
      comment: "Aika meh",
      date: "20.08.2021",
      excercises: [
        {
          name: "Penkkipunnerrus",
          reps: 10,
          weight: 80,
          sets: 6,
        },
      ],
    },
  ]);
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
    const newWorkout = {
      length: `${hours}.${mins}`,
      comment: comment,
      date: date,
    };

    setWorkout(workouts.concat(newWorkout));
    setMins("");
    setHours("");
    setComment("");
    setDate("");
  };
  console.log(date);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <AddNewForm
          workouts={workouts}
          setWorkout={setWorkout}
          setHours={setHours}
          setMins={setMins}
          setComment={setComment}
          setDate={setDate}
          date={date}
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
