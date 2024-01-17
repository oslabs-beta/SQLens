import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
  const [tables, setTables] = useState([]);

  useEffect(() => {
    // getGreeting().then((res) => setGreeting(res.greeting));
    
    getTables().then((res) => {
      console.log(res);
      // setTables(res);
    })
    
  }, []);


  return (
    <>
      <p>Server response: {tables}</p>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
