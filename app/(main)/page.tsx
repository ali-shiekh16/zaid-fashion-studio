import React from 'react';

import Cover from './home/hero';
import { FAQ } from './home/faq';
import CustomerReviews from './home/customer-reviews';

const Page = () => {
  return (
    <>
      <Cover />
      <CustomerReviews />
      <FAQ />
    </>
  );
};

export default Page;
