import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#496567", 
      dark: "#325154", 
      light: "#1b3e41", 
    },
    secondary: {
      main: "#674b49",  
      dark: "#411e1b", 
      light: "#b3a5a4", 
    },
    text: {
      primary: "#222222", // gri foarte închis
      secondary: "#555555", // gri mai soft
    },
    background: {
      default: "#ffffff", // alb simplu pt pagină
      paper: "#f9f9f9", // pentru carduri/secțiuni
    },
  },
  typography: {
    fontFamily: `"ROBOTO THIN 100", "ROBOTO THIN 100", serif`,
    h1: {
      fontFamily: `"ROBOTO THIN 100", serif`,
      fontWeight: 400,
    },
    h2: {
      fontFamily: `"ROBOTO THIN 100", serif`,
      fontWeight: 400,
    },
    body1: {
      fontFamily: `"ROBOTO THIN 100", serif`,
      fontWeight: 200,
    },
  },
});
export default theme;