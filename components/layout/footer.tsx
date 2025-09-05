import React from 'react';
import { Block } from './Block';
import { Container } from './container';
import Link from 'next/link';
import Logo from '../logo';

const Footer = () => {
  return (
    <>
      <Block className='bg-gray-50'>
        <Container className='md:grid md:grid-cols-5  items-start'>
          <div className='flex items-center space-x-2 mb-5 md:mb-0'>
            <Logo /> <p className='font-medium'>Zaid Fashion Studio</p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5 md:col-span-4'>
            <div>
              <h3 className='font-medium mb-1'>Privacy & Polciy</h3>
              <ul>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-medium mb-1'>Privacy & Polciy</h3>
              <ul>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-medium mb-1'>Privacy & Polciy</h3>
              <ul>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-medium mb-1'>Privacy & Polciy</h3>
              <ul>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
                <li>
                  <Link href='#'>Lorem ipsum dolor</Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>

        <div className='px-8 mt-15 space-y-1 text-center text-sm'>
          <p>2025 &copy; Copyrights reserved Zaid Fashion Studio </p>
          <p>
            Designed & Developed by{' '}
            <Link className='underline font-medium' href='linkedin.com/'>
              Muhammed Ali
            </Link>
          </p>
        </div>
      </Block>
    </>
  );
};

export default Footer;
