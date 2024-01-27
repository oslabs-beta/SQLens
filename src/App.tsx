import { useState, useEffect } from 'react';
import './stylesheets/index.css';
import Flow from './components/Flow';
import LandingPage from './components/LandingPage';
import TableObj from './vite-env';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import useStore from './store';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Fira Mono',
  },
});



function App() {
  const { fetchTables } = useStore((state) => ({
    fetchTables: state.fetchTables,
  }));

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/flow" element={<Flow />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
