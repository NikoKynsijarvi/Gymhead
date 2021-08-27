import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Container,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  MenuItem,
} from "@material-ui/core";
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded";

const exerciseNames = [
  "Penkkipunnerrus",
  "Jalkakyykky",
  "Maastaveto",
  "Hauiskääntö",
  "Kulmasoutu",
];

function ExerciseForm() {
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
      <Grid item xs={6} md={6} lg={6}>
        <TextField
          autoFocus
          margin="dense"
          id="eWeight"
          label="Paino kg"
          type="number"
          fullWidth
        />
      </Grid>
    </>
  );
}

function AddNewForm(props) {
  const [formOpen, setFormOpen] = useState(false);
  const { setMins, setHours, setComment, setDate } = props;

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
        <Grid item xs={10} md={8} lg={8}>
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
        <Grid item xs={2} md={4} lg={4}>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            type="text"
            label="Pvm"
            fullWidth
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Tooltip title="Lisää liike">
            <IconButton onClick={() => setFormOpen(true)}>
              <AddCircleOutlineRounded color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
        {formOpen ? <ExerciseForm /> : <div></div>}
      </Grid>
    </Container>
  );
}

function Popup(props) {
  const [mins, setMins] = useState(null);
  const [hours, setHours] = useState(null);
  const [comment, setComment] = useState(null);
  const [date, setDate] = useState(null);
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

  console.log(workouts);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography component="h2" variant="h6" color="secondary" gutterBottom>
          Lisää uusi
        </Typography>
      </DialogTitle>
      <DialogContent>
        <AddNewForm
          workouts={workouts}
          setWorkout={setWorkout}
          setHours={setHours}
          setMins={setMins}
          setComment={setComment}
          setDate={setDate}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Peru
        </Button>
        <Button onClick={handleClose} color="primary">
          Lisää
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
