import { AppBar, Grid, Toolbar, Box, Typography } from "@material-ui/core";
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
            <h1>Will be login page</h1>
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
