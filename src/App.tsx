import { useEffect } from 'react';
import './stylesheets/index.css';
import Flow from './components/Flow';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useStore from './store';
import starterTables from './components/starterTables';

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
  }, [setTables]);

  return (
    <ThemeProvider theme={theme}>
      <Flow />
    </ThemeProvider>
  );
}

export default App;
