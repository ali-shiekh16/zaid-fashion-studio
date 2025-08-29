import ImageCarouselBasic from '@/components/commerce-ui/image-carousel-basic';
import CarouselExample from '@/components/commerce-ui/image-carousel-basic-ex-02';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/app-utils';
import { getProduct } from '@/lib/data/products/get-product';
import React from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const { data: product, success } = await getProduct(+id);

  if (!success || !product)
    return (
      <Container>
        <p className='text-center text-3xl'>Product Not Found.</p>
      </Container>
    );

  const { name: title, price, images, description } = product;

  return (
    <Container className='flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-10 my-10'>
      <div className='order-1 md:order-0 '>
        <ImageCarouselBasic
          images={images.map(i => ({ title: product.name, url: i }))}
          imageFit='contain'
          thumbPosition='bottom'
          classNameImage='border-2 border-red-500'
        />
      </div>

      <div>
        <h1 className='text-3xl font-semibold'>{title}</h1>

        <div className='flex items-center space-x-5 mt-10 text-3xl font-medium'>
          <strong className='font-semibold'>PKR {formatCurrency(price)}</strong>

          <strong className='text-muted-foreground line-through font-medium'>
            {formatCurrency(price + price * 0.25)}
          </strong>

          <strong className='text-sm font-medium bg-primary text-white rounded-md p-1'>
            -25% OFF
          </strong>
        </div>

        <div className='flex gap-4 mt-5'>
          <Button
            variant='outline'
            // onClick={onAddToCart}
            className='flex-1 min-h-12'
          >
            Add to cart
          </Button>
          <Button
            // onClick={onBuyNow}
            className='flex-1 min-h-12'
          >
            Buy now
          </Button>
        </div>

        <p className='mt-2 text-muted-foreground'>
          Note: Color of the article may vary slighly from the uploaded image.
        </p>

        <p className='text-muted-foreground mt-10 whitespace-pre-wrap'>
          {description}
        </p>
      </div>
    </Container>
  );
};

export default Page;
