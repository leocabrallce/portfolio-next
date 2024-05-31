import { defineType } from 'sanity';

const projectCategory = defineType({
  title: 'Project Category',
  name: 'projectCategory',
  type: 'document',
  fields: [
    {
      title: 'Category Name',
      name: 'categoryName',
      type: 'string',
    },
    {
      title: 'Category Description',
      name: 'categoryDescription',
      type: 'text',
    },
    {
      title: 'Category Image',
      name: 'categoryImage',
      type: 'image',
    }
  ]
});

export default projectCategory;