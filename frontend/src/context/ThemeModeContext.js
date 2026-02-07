import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeModeContext = createContext(null);

const getTheme = mode =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1e56d5',
        light: '#5b8ef8',
        dark: '#1248b3',
      },
      secondary: {
        main: '#5b4ecf',
        light: '#8b7ee0',
        dark: '#3d2ca3',
      },
      background: {
        default: mode === 'dark' ? '#0a0e27' : '#f8f9fc',
        paper: mode === 'dark' ? '#0f1527' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#e4e6eb' : '#0f172a',
        secondary: mode === 'dark' ? '#b0b3ba' : '#1f2937',
      },
      divider: mode === 'dark' ? '#2c3447' : '#e5e7eb',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.35,
        letterSpacing: '-0.005em',
      },
      h3: {
        fontWeight: 700,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 700,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 700,
        fontSize: '1.125rem',
        lineHeight: 1.45,
      },
      h6: {
        fontWeight: 700,
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.3px',
      },
      body2: {
        fontSize: '0.9375rem',
        lineHeight: 1.6,
        letterSpacing: '0.2px',
      },
      button: {
        fontWeight: 700,
        letterSpacing: '0.5px',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return context;
};
