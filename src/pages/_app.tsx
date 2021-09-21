import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import Layout from '@/components/layout';

import client from '@/../lib/apolloClients';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
