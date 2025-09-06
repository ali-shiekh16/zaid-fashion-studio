import { Block } from '@/components/layout/Block';
import { Container } from '@/components/layout/container';
import React from 'react';
import ReviewCard from './review-card';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Blogger',
      image: '/images/customers/1.jpg',
      review:
        'Absolutely stunning designs! Zaid Fashion Studio created the perfect outfit for my wedding. The attention to detail and quality is unmatched.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Executive',
      image: '/images/customers/2.jpg',
      review:
        'Professional service and exceptional craftsmanship. My custom suits from Zaid are always perfectly tailored and stylish.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Event Coordinator',
      image: '/images/customers/3.jpg',
      review:
        "I've been a loyal customer for over 3 years. Every piece I've ordered has exceeded my expectations. Highly recommend!",
      rating: 5,
    },
    {
      id: 4,
      name: 'David Rodriguez',
      role: 'Photographer',
      image: '/images/customers/4.jpg',
      review:
        'The creativity and skill of Zaid Fashion Studio is incredible. They bring your vision to life with such precision and style.',
      rating: 5,
    },
  ];

  return (
    <Block>
      <Container>
        <h2 className='text-center text-3xl font-medium mb-14'>
          <span className='text-center uppercase text-sm block text-muted-foreground'>
            Testimonials
          </span>
          Our Customer Reviews
        </h2>

        <div className='md:grid md:grid-cols-4 md:gap-x-5 space-y-5 md:space-y-0'>
          {reviews.map(review => (
            <ReviewCard
              key={review.id}
              name={review.name}
              role={review.role}
              image={review.image}
              review={review.review}
              rating={review.rating}
            />
          ))}
        </div>
      </Container>
    </Block>
  );
};

export default CustomerReviews;
