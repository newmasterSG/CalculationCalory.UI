import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
  palette: {
    background: {
      default: '#0f0f0f',
      paper: '#1a1a1a',
    },
    primary: {
      main: '#00ffff',
    },
    secondary: {
      main: '#ff00ff',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#e0e0e0'
    },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif',
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
          borderColor: '#00ffff',
          borderWidth: 1,
          borderStyle: 'solid',
        },
      },
    },
  },
});