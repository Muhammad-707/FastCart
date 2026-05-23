import { Heart, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/reducers/CartSlice';

export default function Card5({ product }: { product: any }) {
  if (!product) return null;
  const { id, _id, image, productName, price, rating, quantity, isNew, colors } = product;
  const productId = id || _id || productName;

  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsLiked(savedWishlist.some((item: any) => (item.id || item._id || item.title) === productId));
    };
    checkWishlist();
    window.addEventListener('wishlist-updated', checkWishlist);
    return () => window.removeEventListener('wishlist-updated', checkWishlist);
  }, [productId]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const itemIndex = savedWishlist.findIndex((item: any) => (item.id || item._id || item.title) === productId);
    let updatedWishlist = [...savedWishlist];
    if (itemIndex > -1) {
      updatedWishlist.splice(itemIndex, 1);
    } else {
      updatedWishlist.push({ id: productId, _id: productId, image, title: productName, price, rating, reviews: quantity, isNew, colors });
    }
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ id: String(productId), name: productName, image, price: Number(price) || 0, quantity: 1 }));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="w-[270px] flex flex-col gap-4 group select-none">
      <div className="relative w-full h-[250px] bg-zinc-100 dark:bg-zinc-900 rounded-sm flex items-center justify-center overflow-hidden">
        {isNew && <span className="absolute top-3 left-3 bg-[#00FF66] text-white px-3 py-1 text-xs rounded z-10">NEW</span>}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <div onClick={toggleWishlist} className={`p-2 rounded-full cursor-pointer transition-all border ${isLiked ? "bg-[#DB4444] text-white border-[#DB4444]" : "bg-white dark:bg-black text-black dark:text-white"}`}>
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </div>
          <div className="p-2 bg-white dark:bg-black rounded-full cursor-pointer dark:text-white"><Eye size={20} /></div>
        </div>
        <img src={image || '/placeholder.png'} alt={productName} className="h-[150px] object-contain transition-transform duration-300 group-hover:scale-105" />
        <button onClick={handleAddToCart} className="absolute bottom-0 w-full bg-black dark:bg-white text-white dark:text-black py-2.5 font-medium opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-base truncate dark:text-white">{productName}</h3>
        <div className='flex items-center gap-4'>
          <span className="text-[#DB4444] font-medium">${price}</span>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.floor(rating || 5) ? "text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}>★</span>
              ))}
            </div>
            {/* Используем quantity как количество отзывов */}
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm">({quantity || 0})</span>
          </div>
          {colors && colors.length > 0 && (
            <div className="flex gap-2 mt-1">
              {colors.map((color: string, i: number) => <div key={i} className={`w-4 h-4 rounded-full border border-black dark:border-white ${color}`} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}