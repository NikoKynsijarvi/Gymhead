import React from "react";
import { useQuery } from "@apollo/client";
import HomePage from "./components/HomePage";
import { ALL_WORKOUTS } from "./components/queries";

function App() {
  const result = useQuery(ALL_WORKOUTS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
