import { Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '@/reducers/CartSlice';

interface Card3Props {
  id?: string | number;
  image: string;
  title: string;
  price: string | number;
  oldPrice?: string;
  rating: number;
  reviews: number;
  isLoading?: boolean;
}

export default function Card3({ id, image, title, price, oldPrice, rating, reviews, isLoading }: Card3Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const productId = id || title;

  const imageUrl = image?.startsWith('http') 
    ? image 
    : `https://fastcard-1-o23z.onrender.com/images/${image?.replace(/^\/+/, '')}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    dispatch(addToCart({ id: String(productId), name: title, image: imageUrl, price: cleanPrice || 0, quantity: 1 }));
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (isLoading) {
    return (
      <div className="w-[270px] flex flex-col gap-4 animate-pulse">
        <div className="w-full h-[250px] bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
          <div className="flex gap-3 text-base">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
          </div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => navigate(`/detail/${productId}`)}
      className="w-[270px] flex flex-col gap-4 group select-none cursor-pointer"
    >
      <div className="relative w-full h-[250px] bg-zinc-100 dark:bg-zinc-900 rounded-sm flex items-center justify-center overflow-hidden">
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <div 
            onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} 
            className={`p-2 rounded-full shadow-sm cursor-pointer transition-all border hover:scale-110 ${isLiked ? "bg-[#DB4444] text-white border-[#DB4444]" : "bg-white dark:bg-black text-black dark:text-white border-transparent"}`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </div>
          <div className="p-2 bg-white dark:bg-black text-black dark:text-white shadow-sm rounded-full cursor-pointer hover:scale-110 transition-transform">
            <Eye size={20} />
          </div>
        </div>
        
        <img src={imageUrl} alt={title} className="h-[150px] object-contain" />
        
        <button 
          onClick={handleAddToCart} 
          className="absolute bottom-0 w-full bg-black dark:bg-white text-white dark:text-black py-2.5 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0"
        >
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-base truncate dark:text-white">{title}</h3>
        <div className="flex gap-3 text-base">
          <span className="text-[#DB4444] font-medium">{typeof price === 'number' ? `$${price}` : price}</span>
          {oldPrice && <span className="text-zinc-500 dark:text-zinc-400 line-through">{oldPrice}</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}>★</span>
            ))}
          </div>
          <span className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm">({reviews})</span>
        </div>
      </div>
    </div>
  );
}