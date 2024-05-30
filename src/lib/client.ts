import { getSdk } from "@/gql/generated";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient('https://mt1hxcmm.api.sanity.io/v1/graphql/production/default');
export const sdk = getSdk(client);
