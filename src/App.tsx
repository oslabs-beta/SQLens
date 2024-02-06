import { useEffect } from 'react';
import './stylesheets/index.css';
import Flow from './components/Flow';
// import LandingPage from './components/LandingPage';
// import { BrowserRouter as DefaultRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useStore from './store';
// import { useQuery } from '@apollo/client';
// import { GET_TABLE_NAMES } from './utilities/queries';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Fira Mono',
  },
});



function App() {
  const setTables = useStore((state) => state.setTables);

  useEffect(() => {
      setTables(starterTables);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Flow />
    </ThemeProvider>
  );
}

export default App;
