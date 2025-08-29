import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/app-utils';
import { Product } from '@/lib/types/product';
import Image from 'next/image';
import Link from 'next/link';
import AddCartBtn from './add-cart-btn';
import BuyBtn from './buy-button';

function ProductCard(product: Product) {
  const { images, price, name: title, id } = product;

  return (
    <div className='group relative flex  flex-col overflow-hidden rounded-md md:max-w-[300px]'>
      {/* Image section with background and dynamic glow effect */}
      <div className=' overflow-hidden'>
        <Link href={`/products/${id}`}>
          <Image
            width='500'
            height='750'
            alt={title}
            src={images[0]}
            className='w-full h-full md:w-[300px] md:min-h-[450px] object-contain transition-transform duration-500 hover:scale-105 bg-muted'
          />
        </Link>
      </div>

      {/* Content section */}
      <div className='flex flex-1 flex-col mt-2 '>
        <h3 className='text-lg font-normal tracking-tight'>{title}</h3>

        <div className='flex space-x-2 mt-3'>
          <strong className='text-xl font-medium'>
            PKR {formatCurrency(price)}
          </strong>

          <strong className='text-xl text-muted-foreground font-medium  line-through'>
            {formatCurrency(price + price * 0.25)}
          </strong>
        </div>

        <div className='mt-3 flex flex-col gap-2'>
          <AddCartBtn {...product} />
          <BuyBtn {...product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
