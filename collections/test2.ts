import { CollectionConfig } from 'payload/types';

const Test2: CollectionConfig = {
  slug: 'tests2',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'test name',
    },
  ],
  timestamps: false,
};

export default Test2;
