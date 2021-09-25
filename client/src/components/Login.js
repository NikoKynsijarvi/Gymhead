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
import React from "react";

function Login() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar color="primary"></Toolbar>
      </AppBar>
      <div>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid item lg={6} xs={12} md={6}>
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
