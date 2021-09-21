import { ApolloClient, InMemoryCache } from '@apollo/client';

const auth = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_KEY}`,
};

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: auth,
});

export default client;
