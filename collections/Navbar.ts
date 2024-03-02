import { CollectionConfig } from 'payload/types';

const Navbar: CollectionConfig = {
  slug: 'navbar',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'option1',
      type: 'text',
      label: 'Option 1',
    },
    {
      name: 'option2',
      type: 'text',
      label: 'Option 2',
    },
  ],
  timestamps: false,
};

export default Navbar;
