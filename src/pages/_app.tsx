import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import client from '@/../lib/apolloClients';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
