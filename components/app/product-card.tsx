import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/app-utils';
import { Product } from '@/lib/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends Product {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

function ProductCard({
  images,
  // onAddToCart = () => {},
  // onBuyNow = () => {},
  price,
  name: title,
  id,
}: Props) {
  return (
    <div className='group relative flex w-sm flex-col overflow-hidden rounded-md   transition-all duration-300'>
      {/* Image section with background and dynamic glow effect */}
      <div className='transition-transform duration-500 group-hover:scale-105'>
        <Link href={`/products/${id}`}>
          <Image
            width='500'
            height='750'
            alt={title}
            src={images[0]}
            className='w-full h-full object-cover'
          />
        </Link>
      </div>

      {/* Content section */}
      <div className='flex flex-1 flex-col mt-2 '>
        <h3 className='text-xl tracking-tight truncate'>{title}</h3>

        <div className='flex space-x-2 mt-2'>
          <strong className='text-xl font-semibold'>
            PKR {formatCurrency(price)}
          </strong>

          <strong className='text-xl text-muted-foreground font-medium  line-through'>
            {formatCurrency(price + price * 0.25)}
          </strong>
        </div>

        <div className='mt-3 flex flex-col gap-2'>
          <Button
            variant='outline'
            // onClick={onAddToCart}
            className='w-full '
          >
            Add to cart
          </Button>
          <Button
            // onClick={onBuyNow}
            className='w-full'
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
export type { Props as ProductCardProps };
