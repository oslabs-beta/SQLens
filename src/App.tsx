import { useState, useEffect } from 'react';
import './stylesheets/index.css';
import Flow from './Flow';
import LandingPage from './LandingPage';
import TableObj from './vite-env';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Fira Mono',
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
  const [searchValue, setSearchValue] = React.useState('');

  const fetchAndUpdateTables = async () => {
    try {
      const res = await getTables();
      setTables(res);
    } catch (error) {
      console.error('Error fetching updated tables:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/setDatabaseUri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseURI: searchValue })
      });
      const data = await response.json();
      if (response.ok && data.message === 'Database connection updated successfully') {
        await fetchAndUpdateTables();
      } else {
        console.error(data.error || 'Failed to update database URI');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getTables().then((res) => {
      res.sort((a,b)=>{
        if(a.foreignKeys.length < b.foreignKeys.length) return -1
        else return 1
      });
      console.log(res);
      setTables(res);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage onSearchSubmit={handleSubmit} onSearchChange={setSearchValue} searchValue={searchValue}/>} />
          <Route path="/flow" element={
            <Flow tables={tables} fetchAndUpdateTables={fetchAndUpdateTables} onSearchSubmit={handleSubmit} onSearchChange={setSearchValue}/>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
