import React from "react";
import { useQuery } from "@apollo/client";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { ALL_WORKOUTS } from "./components/graphql/queries";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const result = useQuery(ALL_WORKOUTS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <Router>
      <>
        <Switch>
          <Route path="/home">
            <HomePage workouts={result.data.allWorkouts} />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
