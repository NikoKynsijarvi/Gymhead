import React, { useState } from "react";
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
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  ClickAwayListener,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LastWorkout from "./LastWorkout";
import Chart from "./Chart";
import NewWorkout from "./NewWorkout";
import Popup from "./Popup";

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
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();

  const list = () => (
    <Box role="presentation">
      <List>
        {["Kalenteri", "Harjoitukset", "Tilastot"].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="relative">
          <Toolbar color="#00F291">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawer(!drawer)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <main>
          <div className={classes.appBarSpacer} />
          <Drawer open={drawer} anchor="top">
            <ClickAwayListener onClickAway={() => setDrawer(false)}>
              {list()}
            </ClickAwayListener>
          </Drawer>
          <Container maxWidth="lg">
            <Popup open={open} setOpen={setOpen} />
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
                  <NewWorkout setOpen={setOpen} />
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
