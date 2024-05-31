import type { CodegenConfig } from '@graphql-codegen/cli';

const GRAPHQL_URL: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string;

const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_URL,
  documents: "src/**/*.(tsx|ts|graphql)",
  generates: {
    "src/gql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: true
      },
    }
  }
};

export default config;
