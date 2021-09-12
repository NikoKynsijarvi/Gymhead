import React, { useState } from "react";
import ExerciseForm from "./ExerciseForm";
import { Container, Grid, TextField, Button } from "@material-ui/core";

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
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            autoFocus
            inputProps={{ maxLength: 2 }}
            error={hourError.value}
            helperText={hourError.text}
            margin="dense"
            color="secondary"
            id="lengthH"
            label="Treenin pituus h"
            type="text"
            fullWidth
            onChange={(e) => handleHours(e)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            autoFocus
            inputProps={{ maxLength: 2 }}
            error={minError.value}
            helperText={minError.text}
            margin="dense"
            color="secondary"
            id="lengthMin"
            label="Treenin pituus min"
            type="text"
            fullWidth
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

export default AddNewForm;
