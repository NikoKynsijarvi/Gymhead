import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff9e40",
      main: "#ff6d00",
      dark: "#c43c00",
      contrastText: "#fff",
      success: "#4BFA4B",
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
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem("gymhead-user-token");
    const loggedUser = window.localStorage.getItem("gymhead-user");
    if (loggedUserToken) {
      setToken(loggedUserToken);
    }
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <Router>
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Switch>
            {!token ? (
              <Login setToken={setToken} setUser={setUser} />
            ) : (
              <>
                <Route path="/home">
                  <HomePage
                    workouts={result}
                    setResult={setResult}
                    setToken={setToken}
                    setUser={setUser}
                    user={user}
                  />
                </Route>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </>
            )}
          </Switch>
        </ThemeProvider>
      </>
    </Router>
  );
}

export default App;
