import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import Flow from "./Flow";
import TableColumnsObject from './vite-env';
import Grid from '@mui/material/Unstable_Grid2';

// const getGreeting = async function() {
//   const res = await fetch('/api/test');
//   return await res.json();
// }

const getTables = async function() {
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
  // const [count, setCount] = useState(0);
  // const [greeting, setGreeting] = useState('');
  const [tables, setTables] = useState<TableColumnsObject | []>([]);

  useEffect(() => {
    // getGreeting().then((res) => setGreeting(res.greeting));

    getTables().then((res) => {
      console.log(res);
      setTables(res);
    })

  }, []);


  return (
    <>
      {/* <p>Server response: {tables}</p> */}
      <Flow tables={tables}/>
    </>
  )
}

export default App;
