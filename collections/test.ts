import { CollectionConfig } from 'payload/types';

const Test: CollectionConfig = {
  slug: 'tests',
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

export default Test;
