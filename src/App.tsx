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
  const res = await fetch('/api/tables');
  const final = await res.json();
// console.log(final);
  return final;
}


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
