import { defineType } from "sanity";

const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'projectTopic' } }],
    },
    {
      name: 'projectCategories',
      title: 'Project Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'projectCategory' } }],
    },
  ],
});

export default project;