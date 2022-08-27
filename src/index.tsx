import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

import { ANILIST_GRAPHQL_URL } from 'configs/constants';

import './index.css';
import App from './App';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: ANILIST_GRAPHQL_URL,
    fetchOptions: {
      method: "POST"
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }),
});

declare global {
  interface Window {
    apolloClient: typeof apolloClient
  }
}
window.apolloClient = apolloClient;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
