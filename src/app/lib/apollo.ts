import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({ uri: '/cv-beautifier-backend/graphql' as any });

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink as any),
  cache: new InMemoryCache(),
});


