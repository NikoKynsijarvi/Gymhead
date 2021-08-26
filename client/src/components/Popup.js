import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  DialogContentText,
  Container,
  Grid,
} from "@material-ui/core";

function AddNewForm() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function Popup(props) {
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Lisää uusi</DialogTitle>
      <DialogContent>
        <AddNewForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
