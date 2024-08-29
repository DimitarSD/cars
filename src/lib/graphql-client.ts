import { GraphQLClient } from 'graphql-request';
import { getSdk } from './_generated/graphql_sdk';

const endpoint = process.env.NEXT_PUBLIC_FRONTEND_GRAPTHQL_ENDPOINT || 'https://task_fe_demo.pfgbulgaria.com/graphql'
const graphqlClient = new GraphQLClient(endpoint, {
  headers: {},
});

export const sdk = getSdk(graphqlClient);