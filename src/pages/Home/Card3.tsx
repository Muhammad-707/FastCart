import { Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/reducers/CartSlice';

interface Card3Props {
  image: string;
  title: string;
  price: string | number;
  oldPrice?: string;
  rating: number;
  reviews: number;
}

export default function Card3({ image, title, price, oldPrice, rating, reviews }: Card3Props) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    dispatch(addToCart({ id: title, name: title, image, price: cleanPrice || 0, quantity: 1 }));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="w-[270px] flex flex-col gap-4 group select-none">
      <div className="relative w-full h-[250px] bg-zinc-100 rounded-sm flex items-center justify-center overflow-hidden">
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <div onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} 
               className={`p-2 rounded-full cursor-pointer transition-all ${isLiked ? "bg-[#DB4444] text-white" : "bg-white"}`}>
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </div>
          <div className="p-2 bg-white rounded-full cursor-pointer"><Eye size={20} /></div>
        </div>
        
        <img src={image} alt={title} className="h-[150px] object-contain" />
        
        <button onClick={handleAddToCart} className="absolute bottom-0 w-full bg-black text-white py-2.5 opacity-0 group-hover:opacity-100 transition-all">
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-base truncate">{title}</h3>
        <div className="flex gap-3 text-base">
          <span className="text-[#DB4444] font-medium">{price}</span>
          {oldPrice && <span className="text-zinc-500 line-through">{oldPrice}</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-zinc-300"}>★</span>
            ))}
          </div>
          <span className="text-zinc-500 font-semibold text-sm">({reviews})</span>
        </div>
      </div>
    </div>
  );
}