import React, { useState, useEffect } from "react";
import {
  AppBar,
  Grid,
  Toolbar,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useMutation } from "@apollo/client";
import CreateUser from "./CreateUser";

import { LOGIN } from "./graphql/mutations";
const useStyles = makeStyles((theme) => ({
  bg: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Login({ setToken, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, setCreateUser] = useState(false);
  const [error, setError] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError("Väärä käyttäjätunnus tai salasana");
    },
  });
  const classes = useStyles();
  console.log(error);
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      setUser(username);
      localStorage.setItem("gymhead-user-token", token);
      localStorage.setItem("gymhead-user", username);
    }
  }, [result.data]); // eslint-disable-line

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      login({ variables: { username, password } });

      window.localStorage.setItem(
        "loggedGymheadUser",
        JSON.stringify({ username: username, password: password })
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AppBar position="relative">
        <Toolbar color="primary"></Toolbar>
      </AppBar>
      <div>
        <Grid
          container
          component="main"
          sx={{ height: "100vh" }}
          className={classes.bg}
        >
          <Grid item lg={12} xs={12} md={12}>
            <CreateUser open={createUser} setOpen={setCreateUser} />
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#ffff" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" color="primary">
                Kirjaudu sisään
              </Typography>
              <Box
                component="form"
                autoComplete="off"
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Käyttäjätunnus"
                  name="username"
                  autoFocus
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Salasana"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={(event) => handleSubmit(event)}
                >
                  Kirjaudu
                </Button>
              </Box>
              <Button variant="text" onClick={() => setCreateUser(true)}>
                Luo käyttäjä
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Login;
