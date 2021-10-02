import React, { useState, useEffect } from "react";
import {
  Dialog,
  Container,
  Grid,
  TextField,
  Slide,
  Avatar,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "./graphql/mutations";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  icon: {
    color: "#fff",
  },
});

function CreateUser({ open, setOpen }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [createUser] = useMutation(ADD_USER);

  useEffect(() => {
    if (
      username.length > 4 &&
      password.length > 4 &&
      password === passwordRepeat
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    if (password !== passwordRepeat) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [passwordRepeat, password, username]);

  const handleCreateUser = () => {
    console.log(password, username);
    createUser({ variables: { username, password } });
    setPassword("");
    setUsername("");
    setOpen(false);
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} fullScreen>
      <AppBar position="relative">
        <Toolbar color="primary">
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowBackRoundedIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Luo käyttäjä
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleCreateUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="username"
                color="secondary"
                autoComplete="off"
                required
                fullWidth
                id="username"
                label="Käyttäjätunnus"
                autoFocus
                onChange={({ target }) => setUsername(target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="password"
                color="secondary"
                required
                type="password"
                fullWidth
                id="password"
                label="Salasana"
                autoFocus
                onChange={({ target }) => setPassword(target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="password"
                color="secondary"
                error={passwordError}
                helperText="Salasanat eivät täsmää"
                required
                type="password"
                fullWidth
                id="passwordrepeat"
                label="Salasana uudestaan"
                autoFocus
                onChange={({ target }) => setPasswordRepeat(target.value)}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={disabled}
            >
              Luo käyttäjä
            </Button>
          </Grid>
        </Box>
      </Container>
    </Dialog>
  );
}

export default CreateUser;
