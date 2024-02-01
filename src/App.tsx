import { useEffect } from 'react';
import './stylesheets/index.css';
import Flow from './components/Flow';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useStore from './store';
import { TableState } from './vite-env';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Fira Mono',
  },
});

function App() {
  const fetchTables = useStore((state: TableState) => state.fetchTables);


  useEffect(() => {
    fetchTables();
  }, []);

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
