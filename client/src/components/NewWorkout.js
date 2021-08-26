import React from "react";
import Typography from "@material-ui/core/Typography";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  icon: {
    height: 50,
    width: 50,
  },
});

function NewWorkout({ setOpen }) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        Lisää uusi
      </Typography>
      <IconButton onClick={handleClickOpen}>
        <AddRoundedIcon color="primary" className={classes.icon} />
      </IconButton>
    </>
  );
}

export default NewWorkout;
