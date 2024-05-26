import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_DATASET;

const config = defineConfig({
  projectId,
  dataset,
  apiVersion,
  title: 'Leonardo\'s Portfolio',
  basePath: '/admin',

  plugins: [
    structureTool(),
  ]
});

export default config;