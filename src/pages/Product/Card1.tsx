import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/reducers/CartSlice';

export default function Card1({ id, _id, title, price, rating, reviews, image }: any) {
  const productId = id || _id || title;
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  // Синхронизация состояния лайка
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
    e.preventDefault();
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const itemIndex = savedWishlist.findIndex((item: any) => (item.id || item._id || item.title) === productId);

    let updatedWishlist = [...savedWishlist];
    if (itemIndex > -1) {
      updatedWishlist.splice(itemIndex, 1);
    } else {
      updatedWishlist.push({ id: productId, _id: productId, title, price, rating, reviews, image });
    }
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Очистка цены
    const cleanPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.]/g, '')) 
      : price;

    const productToAdd = {
      id: String(productId),
      name: title,
      image: image,
      price: cleanPrice || 0,
      quantity: 1
    };

    // 1. Диспатч в Redux
    dispatch(addToCart(productToAdd));

    // 2. Пинг для обновления интерфейса
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="group w-full max-w-[270px] flex flex-col gap-3 transition-colors select-none">
      <div className="relative bg-zinc-100 dark:bg-zinc-800 h-[250px] flex items-center justify-center rounded-sm overflow-hidden">
        <img src={image} alt={title} className="h-[150px] object-contain transition-transform duration-300 group-hover:scale-105" />
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button 
            onClick={toggleWishlist}
            className={`p-2 rounded-full shadow-sm border transition-all ${
              isLiked 
                ? "bg-[#DB4444] text-white border-[#DB4444] scale-105" 
                : "bg-white dark:bg-black text-black dark:text-white border-transparent hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <button className="bg-white dark:bg-black p-2 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-zinc-700">
            <svg className="dark:text-white" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>

        <button 
          onClick={handleAddToCart}
          className="absolute bottom-0 w-full bg-black dark:bg-white text-white dark:text-black py-3 font-medium opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300"
        >
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-base dark:text-white truncate">{title}</h3>
        <div className="text-[#DB4444] font-bold">{typeof price === 'number' ? `$${price}` : price}</div>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(rating || 4) ? "text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}>★</span>
            ))}
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">({reviews})</span>
        </div>
      </div>
    </div>
  );
}