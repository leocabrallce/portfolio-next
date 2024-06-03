import { defineType } from 'sanity';

const projectTopic = defineType({
  title: 'Project Topic',
  name: 'projectTopic',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'codeSandboxPreview' }]
    }
  ]
});

export default projectTopic;