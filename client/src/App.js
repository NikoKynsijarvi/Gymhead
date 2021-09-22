import React from "react";
import { useQuery } from "@apollo/client";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { ALL_WORKOUTS } from "./components/graphql/queries";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

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

function App() {
  const result = useQuery(ALL_WORKOUTS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <Router>
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/home">
              <HomePage workouts={result.data.allWorkouts} />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </ThemeProvider>
      </>
    </Router>
  );
}

export default App;
