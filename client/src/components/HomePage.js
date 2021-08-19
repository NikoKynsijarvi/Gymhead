import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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

function HomePage() {
  const [open, setOpen] = useState(false);

  console.log(open);
  const handleDrawerClose = () => {
    setOpen(!open);
  };
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
              onClick={handleDrawerClose}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

export default HomePage;
