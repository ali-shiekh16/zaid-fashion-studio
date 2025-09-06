import React from 'react';

import Cover from './home/hero';
import { FAQ } from './home/faq';
import CustomerReviews from './home/customer-reviews';
import NewArrivals from './home/new-arrivals';

const Page = () => {
  return (
    <>
      <Cover />
      <NewArrivals />
      <CustomerReviews />
      <FAQ />
    </>
  );
};

export default Page;
