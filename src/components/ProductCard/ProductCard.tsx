import { FC } from 'react';
import { Product } from '@/reducers/ProductSlice';
import { Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800 transition-transform hover:scale-[1.02]">
      <div className="relative aspect-square">
        <img src={product.image} alt={product.title} className="object-cover w-full h-full transition-opacity group-hover:opacity-90" />
        {product.isNew && (
          <span className="absolute left-2 top-2 bg-primary text-white text-xs px-2 py-0.5 rounded">NEW</span>
        )}
        {product.discount && (
          <span className="absolute right-2 top-2 bg-primary text-white text-xs px-2 py-0.5 rounded">-{product.discount}%</span>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <Button variant="ghost" size="icon"><Heart className="text-white" /></Button>
          <Button variant="ghost" size="icon"><Eye className="text-white" /></Button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
        <div className="flex items-center mt-1 text-xs">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          </div>
          <span className="ml-1 text-zinc-500">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-primary">${product.price}</span>
          {product.oldPrice && <span className="text-sm line-through text-zinc-500">${product.oldPrice}</span>}
        </div>
        <Button
          variant="default"
          size="sm"
          className="mt-3 w-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
