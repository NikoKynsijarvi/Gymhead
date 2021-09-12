import React, { useState } from "react";
import {
  MenuItem,
  IconButton,
  makeStyles,
  TextField,
  Grid,
  Tooltip,
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
  "Pystypunnerrus",
];

function ExerciseForm(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const { setFormOpen, setExercises, excercises } = props;

  const handleClose = () => {
    setFormOpen(false);
    const newExercise = {
      name: name,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseInt(weight),
      id: excercises.length,
    };

    setExercises(excercises.concat(newExercise));
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
          onChange={(e) => setName(e.target.value)}
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
          InputProps={{ inputProps: { min: 1, max: 100 } }}
          fullWidth
          onChange={(e) => setSets(e.target.value)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <TextField
          autoFocus
          margin="dense"
          id="eRets"
          label="Toistot"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 100 } }}
          fullWidth
          onChange={(e) => setReps(e.target.value)}
        />
      </Grid>
      <Grid item xs={6} md={4} lg={4}>
        <TextField
          autoFocus
          margin="dense"
          id="eWeight"
          label="Paino kg"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 100 } }}
          fullWidth
          onChange={(e) => setWeight(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <Tooltip title="Valmis">
          <IconButton color="secondary" onClick={handleClose}>
            <AddCircleOutlineRounded className={classes.addIcon} />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
}

export default ExerciseForm;
