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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useMutation } from "@apollo/client";
import CreateUser from "./CreateUser";

import { LOGIN } from "./graphql/mutations";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, setCreateUser] = useState(false);
  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("gymhead-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };
  return (
    <>
      <AppBar position="relative">
        <Toolbar color="primary"></Toolbar>
      </AppBar>
      <div>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid item lg={6} xs={12} md={6}>
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
                onSubmit={submit}
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Kirjaudu
                </Button>
              </Box>
              <Button variant="text" onClick={() => setCreateUser(true)}>
                Luo käyttäjä
              </Button>
            </Box>
          </Grid>
          <Grid item lg={6} xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "secondary.main",
              }}
            >
              <Typography variant="h2" style={{ color: "#ffff" }}>
                Hello World
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Login;
