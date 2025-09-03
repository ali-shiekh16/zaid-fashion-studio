import { HTMLAttributes, useId } from 'react';
import { SearchIcon, ShoppingBag } from 'lucide-react';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import CartBadge from './cart-badge';
import { cn } from '@/lib/utils';

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: '/products', label: 'Products' },
  { href: '#', label: 'Categories' },
  { href: '#', label: 'Deals' },
];

export default function Navbar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const id = useId();

  return (
    <header {...props} className={cn('px-4 md:px-6', className)}>
      <div className='flex h-16 items-center justify-between gap-4'>
        {/* Left side */}
        <div className='flex flex-1 items-center gap-2'>
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className='group size-8 md:hidden'
                variant='ghost'
                size='icon'
              >
                <svg
                  className='pointer-events-none'
                  width={16}
                  height={16}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4 12L20 12'
                    className='origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]'
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='w-36 p-1 md:hidden'>
              <NavigationMenu className='max-w-none *:w-full'>
                <NavigationMenuList className='flex-col items-start gap-0 md:gap-2'>
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className='w-full'>
                      <NavigationMenuLink
                        href={link.href}
                        // className={`[&_svg:not([class*='text-'])]:text-black`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem
                    className='w-full'
                    role='presentation'
                    aria-hidden='true'
                  >
                    <div
                      role='separator'
                      aria-orientation='horizontal'
                      className='bg-border -mx-1 my-1 h-px'
                    ></div>
                  </NavigationMenuItem>
                  <NavigationMenuItem className='w-full'>
                    <NavigationMenuLink href='/login' className='py-1.5'>
                      Sign In
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className='flex flex-1 items-center gap-6 max-md:justify-between'>
            <Link href='/' className='text-primary hover:text-primary/90'>
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className='max-md:hidden'>
              <NavigationMenuList className='gap-2'>
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Link
                      href={link.href}
                      className="data-[active]:focus:bg-accent data-[active]:hover:bg-accent data-[active]:bg-accent data-[active]:text-accent-foreground hover:bg-accent focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            {/* Search form */}
            <div className='relative'>
              <Input
                id={id}
                className='peer h-8 ps-8 pe-2'
                placeholder='Search...'
                type='search'
              />
              <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50'>
                <SearchIcon size={16} />
              </div>
            </div>
            <Link href='/cart' className='block md:hidden'>
              <span className='relative'>
                <ShoppingBag />
                <span className='absolute -inset-y-2 inset-x-4'>
                  <CartBadge />
                </span>
              </span>
            </Link>
          </div>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-2 max-md:hidden'>
          <Button asChild variant='ghost' size='sm' className='text-sm'>
            <Link href='/login'>Sign In</Link>
          </Button>
          <Link href='/cart'>
            <span className='relative'>
              <ShoppingBag />
              <span className='absolute -inset-y-2 inset-x-4'>
                <CartBadge />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
