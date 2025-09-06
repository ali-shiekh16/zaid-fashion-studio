import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ReviewCardProps {
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  role,
  image,
  review,
  rating,
}) => {
  return (
    <div className='space-y-5'>
      {/* Star Rating */}
      <div className='flex justify-center space-x-1'>
        {[...Array(5)].map((_, i) => (
          <Star fill='#000' size='16' />
        ))}
      </div>

      {/* Review Text */}
      <p className='italic text-center'>"{review}"</p>

      {/* Customer Info */}
      <div className='flex justify-center items-center space-x-3'>
        <div className='relative w-12 h-12 mr-4'>
          <Image
            src={image}
            alt={name}
            fill
            className='rounded-full object-cover'
          />
        </div>
        <div className='leading-4'>
          <p className='font-medium'>{name}</p>
          <p className='text-muted-foreground text-sm'>{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
