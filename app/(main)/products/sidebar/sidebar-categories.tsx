import { getCategories } from '@/lib/data/categories/get-categories';
import React from 'react';

const SidebarCategories = async () => {
  const { data, success } = await getCategories();

  if (!success || !data?.length) return null;

  return (
    <div>
      <h2 className='font-medium mb-3'>Categories</h2>
      <ul className='space-y-2'>
        {data.map(c => (
          <li className='hover:underline cursor-pointer' key={c.id}>
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarCategories;
