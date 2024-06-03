import { defineType } from 'sanity';

const codesandboxPreview = defineType({
  title: 'Codesandbox Preview',
  name: 'codeSandboxPreview',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
});

export default codesandboxPreview;