import { defineType } from 'sanity';

const projectCategory = defineType({
  title: 'Project Category',
  name: 'projectCategory',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    }
  ]
});

export default projectCategory;