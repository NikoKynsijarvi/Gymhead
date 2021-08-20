import React from "react";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  IconButton,
  ThemeProvider,
  createTheme,
  Container,
  Grid,
  Paper,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LastWorkout from "./LastWorkout";
import Chart from "./Chart";
import NewWorkout from "./NewWorkout";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff9e40",
      main: "#ff6d00",
      dark: "#c43c00",
      contrastText: "#fff",
    },
    secondary: {
      light: "#88ffff",
      main: "#4dd0e1",
      dark: "#009faf",
      contrastText: "#000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  appBarSpacer: {
    height: 20,
  },
}));

function HomePage({ workouts }) {
  const classes = useStyles();
  console.log(workouts);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="relative">
          <Toolbar color="#00F291">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <main>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4}>
                <Paper className={classes.paper}>
                  <LastWorkout workout={workouts[workouts.length - 1]} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <Paper className={classes.paper}>
                  <Chart workouts={workouts} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={10} lg={10}>
                <Paper className={classes.paper}></Paper>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Paper className={classes.paper}>
                  <NewWorkout />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
}

export default HomePage;
