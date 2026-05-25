import { Eye, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/reducers/CartSlice';

export default function Card2({ product }: any) {
  const dispatch = useDispatch();
  if (!product) return null;

  const title = product.title || product.name || "Product Title";
  const rawImage = product.image || product.img || product.thumbnail || product.images?.[0];
  const price = product.price || 0;
  const oldPrice = product.oldPrice || product.old_price;
  const rating = product.rating || 5;
  const reviewsCount = product.reviewsCount || product.reviews_count || product.reviews || 0;
  const productId = product.id || product._id || product.title;

  const imageUrl = rawImage?.startsWith('http') 
    ? rawImage 
    : rawImage 
      ? `https://fastcard-1-o23z.onrender.com/images/${rawImage.replace(/^\/+/, '')}`
      : '/placeholder.png';

  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const cleanPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.]/g, '')) 
      : price;

    const productToAdd = {
      id: String(productId),
      name: title,
      image: imageUrl,
      price: cleanPrice || 0,
      quantity: 1
    };

    dispatch(addToCart(productToAdd));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const renderStars = (ratingVal: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < Math.floor(ratingVal) ? "text-[#FFAD33]" : "text-zinc-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="w-full flex flex-col gap-3 group select-none">
      <div className="relative w-full h-[250px] bg-[#F5F5F5] dark:bg-zinc-900 rounded-[4px] flex items-center justify-center overflow-hidden">
        
        {hasDiscount ? (
          <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs font-normal px-3 py-1 rounded-[4px] z-10">
            -{discountPercent}%
          </span>
        ) : product.isNew ? (
          <span className="absolute top-3 left-3 bg-[#00FF66] text-black text-xs font-medium px-3 py-1 rounded-[4px] z-10">
            NEW
          </span>
        ) : null}

        <button className="absolute top-3 right-3 p-2 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors z-10">
          <Eye size={20} />
        </button>
        
        {rawImage ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="h-[150px] max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-zinc-200 animate-pulse flex items-center justify-center text-xs text-zinc-400">No Image</div>
        )}
        
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-0 w-full bg-black text-white py-3 font-medium text-xs flex items-center justify-center gap-2 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <ShoppingCart size={16} /> Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-medium text-base text-black dark:text-white truncate">{title}</h3>
        <div className="flex items-center gap-3 text-sm font-medium">
          <span className="text-[#DB4444]">${price}</span>
          {hasDiscount && <span className="text-zinc-400 line-through font-normal">${oldPrice}</span>}
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex items-center">{renderStars(rating)}</div>
          <span className="text-xs text-zinc-500 font-semibold dark:text-zinc-400">({reviewsCount})</span>
        </div>
      </div>
    </div>
  );
}