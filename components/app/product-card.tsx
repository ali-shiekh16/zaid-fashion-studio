import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/app-utils';
import Image from 'next/image';

interface Props {
  imageUrl: string;
  discount?: string | null;
  title: string;
  price: number;
  // onAddToCart?: () => void;
  // onBuyNow?: () => void;
}

function ProductCard({
  discount,
  imageUrl,
  // onAddToCart = () => {},
  // onBuyNow = () => {},
  price,
  title,
}: Props) {
  return (
    <div className='group relative flex w-sm flex-col overflow-hidden rounded-md   transition-all duration-300'>
      {/* Image section with background and dynamic glow effect */}
      <div className='relative overflow-hidden '>
        {discount && (
          <div className='absolute top-3 left-3 z-10'>
            <span className='relative inline-block rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-3 py-1.5 text-xs font-bold text-white'>
              {discount}
            </span>
          </div>
        )}

        <div className='transition-transform duration-500 group-hover:scale-105'>
          <Image
            width='500'
            height='750'
            alt={title}
            src={imageUrl}
            className='w-full h-full object-cover'
          />
        </div>
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
