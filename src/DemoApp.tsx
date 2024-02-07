import { useEffect } from 'react';
import './stylesheets/flowStyle.css';
import Flow from './components/Flow';
// import LandingPage from './components/LandingPage';
import {
  BrowserRouter as DefaultRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useStore from './store';
import starterTables from './components/starterTables';
// import { useQuery } from '@apollo/client';
// import { GET_TABLE_NAMES } from './utilities/queries';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Fira Mono, monospace',
  },
});

function App({ router: RouterComponent = DefaultRouter }) {
  const setTables = useStore((state) => state.setTables);

  useEffect(() => {
    setTables(starterTables);
  }, [setTables]);

  return (
    <ThemeProvider theme={theme}>
      <RouterComponent>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path='/' element={<Flow />} />
        </Routes>
      </RouterComponent>
    </ThemeProvider>
  );
}

export default App;
