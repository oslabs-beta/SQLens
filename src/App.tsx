import { useEffect } from 'react';
import './stylesheets/index.css';
import Flow from './components/Flow';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useStore from './store';
import { useQuery } from '@apollo/client';
import { GET_TABLE_NAMES } from './utilities/queries';

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
  const { data, loading, error } = useQuery(GET_TABLE_NAMES, {
    onCompleted: (data) => {
      setTables(data.getTableNames);
    },
  });


  useEffect(() => {
    if (data && !loading && !error) {
      setTables(data.getTableNames);
    }
  }, [data, loading, error, setTables]);

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
