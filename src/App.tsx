import { useState, useEffect } from 'react';
import './index.css';
import Flow from './Flow';
import NavBar from './NavBar';
import TableObj from './vite-env';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f50b5',
    },
  },
});

const getTables = async function () {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // This query is used to get the table names and columns from the database
    // This is a graphQL query, not a SQL query
    body: JSON.stringify({
      query: `
        query {
          getTableNames {
            name
            columns
            foreignKeys {
              columnName
              foreignTableName
              foreignColumnName
            }
          }
        }
      `,
    }),
  });

  const final = await response.json();
  if (final.errors) {
    console.error(final.errors);
    throw new Error('Error fetching tables');
  }
  return final.data.getTableNames;
};

function App() {
  const [tables, setTables] = useState<TableObj[]>([]);

  const fetchAndUpdateTables = () => {
    getTables().then((res) => {
      setTables(res);
    });
  };

  useEffect(() => {
    getTables().then((res) => {
      console.log(res);
      setTables(res);
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Flow tables={tables} fetchAndUpdateTables={fetchAndUpdateTables} />
      </ThemeProvider>
    </>
  );
}

export default App;
