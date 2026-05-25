import { Heart, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '@/reducers/CartSlice';

export default function Card2({ discount, image, title, price, oldPrice, rating, id, _id, quantity }: any) {
  const productId = id || _id || title;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const imageUrl = image?.startsWith('http') 
    ? image 
    : `https://fastcard-1-o23z.onrender.com/images/${image?.replace(/^\/+/, '')}`;

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = savedWishlist.some((item: any) => (item.id || item._id || item.title) === productId);
    setIsLiked(exists);
  }, [productId]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const itemIndex = savedWishlist.findIndex((item: any) => (item.id || item._id || item.title) === productId);

    let updatedWishlist = [...savedWishlist];
    if (itemIndex > -1) {
      updatedWishlist.splice(itemIndex, 1);
      setIsLiked(false);
    } else {
      const newProduct = { id: productId, _id: productId, discount, image, title, price, oldPrice, rating, quantity };
      updatedWishlist.push(newProduct);
      setIsLiked(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    const productToAdd = {
      id: String(productId),
      name: title,
      image: image,
      price: cleanPrice || 0,
      quantity: 1
    };
    dispatch(addToCart(productToAdd));
  };

  return (
    <div 
      onClick={() => navigate(`/detail/${productId}`)}
      className="group w-[270px] flex flex-col gap-4 cursor-pointer"
    >
      <div className="relative w-full h-[250px] bg-zinc-100 dark:bg-zinc-900 rounded-sm flex items-center justify-center overflow-hidden">
        {discount && <span className="absolute top-3 left-3 bg-[#DB4444] text-white px-3 py-1 text-xs rounded">{discount}</span>}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div onClick={toggleWishlist} className={`p-2 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer border ${isLiked ? "bg-[#DB4444] text-white border-[#DB4444]" : "bg-white dark:bg-black text-black dark:text-white border-transparent"}`}>
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </div>
          <div className="p-2 bg-white dark:bg-black rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer dark:text-white">
            <Eye size={20} />
          </div>
        </div>

        <img src={imageUrl} alt={title} className="h-[150px] object-contain" />

        <button 
          onClick={handleAddToCart}
          className="absolute bottom-0 w-full bg-black dark:bg-white text-white dark:text-black py-2.5 font-medium opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-base dark:text-white">{title}</h3>
        <div className="flex gap-3">
          <span className="text-[#DB4444] font-medium">{typeof price === 'number' ? `$${price}` : price}</span>
          {oldPrice && <span className="text-zinc-500 dark:text-zinc-400 line-through font-medium">{oldPrice}</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-yellow-400">{'★'.repeat(Math.round(rating || 0))}</div>
          <span className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm">({quantity ?? 0})</span>
        </div>
      </div>
    </div>
  );
}