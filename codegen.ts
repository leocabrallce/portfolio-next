import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://mt1hxcmm.api.sanity.io/v1/graphql/production/default",
  documents: "src/types/*.(graphql)",
  generates: {
    "src/gql/types.ts": {
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
