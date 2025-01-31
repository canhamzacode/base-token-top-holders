
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
    uri: 'https://streaming.bitquery.io/graphql',
    cache: new InMemoryCache(),
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_BITQUERY_API_KEY}`
    },
});