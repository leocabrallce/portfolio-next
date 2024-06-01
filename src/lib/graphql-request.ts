import { getSdk } from "@/graphql/types";
import { GraphQLClient } from "graphql-request";

const GRAPHQL_URL: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string;

const client = new GraphQLClient(GRAPHQL_URL);
export const sdk = getSdk(client);
