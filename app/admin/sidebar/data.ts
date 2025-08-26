import {
  BookOpen,
  Bot,
  Box,
  Boxes,
  Frame,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
} from 'lucide-react';

const base = '/admin';

export const data = {
  user: {
    name: 'alee',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: base + '/dashboard',
      icon: LayoutDashboard,
      isActive: true,
    },

    {
      title: 'Categories',
      url: base + '/categories',
      icon: Boxes,
      isActive: false,
      items: [
        {
          title: 'View All Categories',
          url: base + '/categories',
        },
        {
          title: 'Add Categories',
          url: base + '/categories/add',
        },
      ],
    },
    {
      title: 'Products',
      url: base + '/products',
      icon: Box,
      items: [
        {
          title: 'View All Products',
          url: base + '/products',
        },
        {
          title: 'Add Products',
          url: base + '/products/add',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};
