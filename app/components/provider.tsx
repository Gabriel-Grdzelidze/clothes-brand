'use client';

import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const URI = "http://localhost:3000/api/graphql";
  const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
  });


  

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
