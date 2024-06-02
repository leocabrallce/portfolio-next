import { defineType } from 'sanity';

const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        focalPoint: true,
        hotspot: true,
      },
      fields: [
        {
          name: 'altText',
          title: 'Alternative text',
          type: 'string',
        },
      ],
    },
  ],
});

export default hero;