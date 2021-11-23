import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";

function Workouts(props) {
  const { handleLogout, workouts } = props;
  const [drawer, setDrawer] = useState(false);
  console.log(workouts);
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
      <h1>Hello World</h1>
      {workouts.map((w) => (
        <div>
          <p>
            {w.date} {w.comment}
          </p>
        </div>
      ))}
    </>
  );
}

export default Workouts;
