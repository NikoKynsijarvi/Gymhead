import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { USERS_WORKOUTS } from "./graphql/queries";
import {
  AppBar,
  Toolbar,
  IconButton,
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
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LastWorkout from "./LastWorkout";
import Chart from "./Chart";
import NewWorkout from "./NewWorkout";
import Popup from "./Popup";
import { FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Link } from "react-router-dom";

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
  listItem: {
    display: "flex",
    width: "200",
    flexDirection: "row",
    columnGap: theme.spacing(3),
  },
}));

function HomePage({ workouts, setToken, setUser, user, setResult }) {
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const username = user;
  const result = useQuery(USERS_WORKOUTS, {
    variables: { username },
  });
  const classes = useStyles();
  const icons = [<FaCalendarAlt />, <GiWeightLiftingUp />, <FaChartLine />];

  useEffect(() => {
    if (result.data) {
      setResult(result.data.usersWorkouts);
    }
  }, [result, setResult]);

  const handleLogout = () => {
    window.localStorage.removeItem("gymhead-user-token");
    setToken(null);
    setUser(null);
  };

  const list = () => (
    <Box role="presentation">
      <List>
        {[
          { text: "Kalenteri", link: "calender" },
          { text: "Harjoitukset", link: "workouts" },
          { text: "Tilastot", link: "stats" },
        ].map((text, index) => (
          <Link
            to={text.link}
            style={{ textDecoration: "none" }}
            key={text.text}
          >
            <ListItem button className={classes.listItem}>
              {icons[index]}
              <ListItemText primary={text.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
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
          <Button color="inherit" onClick={handleLogout}>
            Kirjaudu ulos
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <div className={classes.appBarSpacer} />
        <Drawer open={drawer} anchor="left">
          <ClickAwayListener onClickAway={() => setDrawer(false)}>
            {list()}
          </ClickAwayListener>
        </Drawer>
        <Container maxWidth="lg">
          <Popup open={open} setOpen={setOpen} user={user} />
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
    </>
  );
}

export default HomePage;
