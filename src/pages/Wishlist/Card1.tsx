import { Trash2, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/reducers/CartSlice';

export default function Card1({ product }: any) {
  const dispatch = useDispatch();

  if (!product) return null;

  const title = product.title || product.name || "Без названия";
  const rawImage = product.image || product.img || product.thumbnail;
  const price = product.price || 0;
  const oldPrice = product.oldPrice || product.old_price;
  const productId = product.id || product._id || product.title;

  const imageUrl = rawImage?.startsWith('http') 
    ? rawImage 
    : rawImage 
      ? `https://fastcard-1-o23z.onrender.com/images/${rawImage.replace(/^\/+/, '')}`
      : '/placeholder.png';

  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = savedWishlist.filter((item: any) => (item.id || item._id || item.title) !== productId);
    
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

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

  return (
    <div className="w-full flex flex-col gap-3 group select-none">
      <div className="relative w-full h-[250px] bg-[#F5F5F5] dark:bg-zinc-900 rounded-[4px] flex items-center justify-center overflow-hidden">
        
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs font-normal px-3 py-1 rounded-[4px] z-10">
            -{discountPercent}%
          </span>
        )}

        <button 
          onClick={handleRemove} 
          className="absolute top-3 right-3 p-2 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors z-10"
        >
          <Trash2 size={20} />
        </button>
        
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-[150px] max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105" 
        />
        
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
          <span className="text-[#DB4444]">{typeof price === 'number' ? `$${price}` : price}</span>
          {hasDiscount && <span className="text-zinc-400 line-through font-normal">{oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}