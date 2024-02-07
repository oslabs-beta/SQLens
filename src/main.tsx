import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './DemoApp.tsx';
import './stylesheets/flowStyle.css';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// const client = new ApolloClient({
//   uri: '/api/graphql',
//   cache: new InMemoryCache(),
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
      <App />
    {/* </ApolloProvider> */}
  </React.StrictMode>
);
