import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import JobReport from './components/JobReport';
import './App.scss';

const client = new ApolloClient({
  uri: 'https://api.graphql.jobs/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <JobReport />
      </div>
    </ApolloProvider>
  );
}

export default App;
