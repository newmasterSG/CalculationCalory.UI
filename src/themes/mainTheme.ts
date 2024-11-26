import { createTheme, ThemeOptions } from "@mui/material/styles";
import { ThemeState } from "../types/types";

const mainTheme: ThemeOptions = {
  typography: {
    fontFamily: "Orbitron, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        body {
          font-family: 'Orbitron', sans-serif;
        }
      `,
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "",
        },
      },
    },
  },
};

export const getTheme = (mode: ThemeState) => {
  const palette = {
    light: {
      background: {
        default: "#ffffff",
        paper: "#f0f0f0",
      },
      primary: {
        main: "#00ffff",
      },
      secondary: {
        main: "#ff00ff",
      },
      text: {
        primary: "#000000",
        secondary: "#555555",
      },
      paperBorderColor: "#00ffff",
    },
    dark: {
      background: {
        default: "#0f0f0f",
        paper: "#1a1a1a",
      },
      primary: {
        main: "#00ffff",
      },
      secondary: {
        main: "#ff00ff",
      },
      text: {
        primary: "#e0e0e0",
        secondary: "#e0e0e0",
      },
      paperBorderColor: "#00ffff",
    },
  };

  const theme = Object.assign({}, mainTheme, {
    palette: palette[mode],
    components: Object.assign({}, mainTheme.components, {
      MuiPaper: {
        styleOverrides: Object.assign(
          {},
          mainTheme.components?.MuiPaper?.styleOverrides,
          {
            root: Object.assign(
              {},
              mainTheme.components?.MuiPaper?.styleOverrides?.root,
              {
                borderColor: palette[mode].paperBorderColor, // Dynamically set borderColor
              }
            ),
          }
        ),
      },
    }),
  });

  return createTheme(theme);
};
