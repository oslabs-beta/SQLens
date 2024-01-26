import { useState, useEffect } from 'react';
import './stylesheets/index.css';
import Flow from './Flow';
import LandingPage from './LandingPage';
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

export const getTables = async function () {
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
  const { fetchTables } = useStore(state => ({ fetchTables: state.fetchTables }));

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
              />
            }
          />

          <Route path="/flow" element={<Flow />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
