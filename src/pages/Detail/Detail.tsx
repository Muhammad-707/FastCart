import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCurrentProduct } from '@/reducers/ProductSlice';
import { addToCart } from '@/reducers/CartSlice';
import { Minus, Plus, Heart, Truck, RotateCcw, Star } from 'lucide-react';
import Related from './Related';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  const { items, currentProduct: product } = useSelector((state: any) => state.products);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
  if (!items || items.length === 0) {
    dispatch(fetchProducts({} as any) as any);
  }
}, [dispatch, items]);

  useEffect(() => {
    if (items && items.length > 0 && id) {
      const foundProduct = items.find((p: any) => 
        String(p.id) === String(id) || 
        String(p.productName) === String(id) || 
        String(p.title) === String(id)
      );
      
      if (foundProduct) {
        dispatch(setCurrentProduct(foundProduct));
      }
    }
  }, [items, id, dispatch]);

  useEffect(() => {
    if (product) {
      setActiveImgIndex(0);
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsLiked(wishlist.some((item: any) => String(item.id) === String(product.id)));
      if (product.size) {
        const sizes = product.size.split(',');
        if (sizes.length > 0) setSelectedSize(sizes[0].trim());
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white font-poppins">
        <div className="animate-pulse text-lg font-medium">Загрузка товара...</div>
      </div>
    );
  }

  const imageUrl = product.image?.startsWith('http') 
    ? product.image 
    : product.image 
      ? `https://fastcard-1-o23z.onrender.com/images/${product.image.replace(/^\/+/, '')}`
      : '/placeholder.png';

  const backendSizes = product.size ? product.size.split(',').map((s: string) => s.trim()) : [];
  const defaultSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const availableSizes = Array.from(new Set([...backendSizes, ...defaultSizes]));

  const galleryImages = [
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl
  ].filter(Boolean);

  const mainImage = galleryImages[activeImgIndex] || imageUrl;

  const handleBuy = () => {
    for (let i = 0; i < quantity; i++) {
      const productToAdd = {
        id: String(product.id),
        name: product.productName || product.title,
        image: imageUrl, 
        price: product.price || 0,
        quantity: 1,
        selectedSize,
        selectedColor,
        cartItemId: `${product.id}-${Date.now()}-${i}`
      };
      dispatch(addToCart(productToAdd));
    }
  };

  const toggleLike = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = wishlist.some((item: any) => String(item.id) === String(product.id));
    if (exists) {
      wishlist = wishlist.filter((item: any) => String(item.id) !== String(product.id));
      setIsLiked(false);
    } else {
      wishlist.push(product);
      setIsLiked(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-poppins min-h-screen antialiased transition-colors duration-300">

      <div className="max-w-[1400px] mx-auto pt-10 pb-10 px-4 text-sm text-zinc-400">
        <div className="flex items-center gap-2 tracking-wide">
          <Link to="/account" className="hover:text-black dark:hover:text-white transition-colors">Account</Link>
          <span>/</span>
          <Link to="/gaming" className="hover:text-black dark:hover:text-white transition-colors">{product.categoryName || 'Category'}</Link>
          <span>/</span>
          <span className="text-black dark:text-white font-medium">{product.productName || product.title}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto pb-24 px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">

        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 xl:gap-6">
          <div className="flex md:flex-col gap-4 min-w-[120px]">
            {galleryImages.map((img: string, i: number) => {
              const isSelected = activeImgIndex === i;
              return (
                <button
                  key={`thumb-${i}`}
                  onClick={() => setActiveImgIndex(i)}
                  className={`w-[140px] h-[130px] bg-[#F5F5F5] dark:bg-[#1A1A1A] rounded flex items-center justify-center p-4 transition-all duration-200 outline-none border
                  ${isSelected ? 'border-[#DB4444] shadow-md transform scale-[1.02]' : 'border-transparent hover:opacity-85'}`}
                >
                  <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </button>
              );
            })}
          </div>

          <div className="flex-1 bg-[#F5F5F5] dark:bg-[#1A1A1A] rounded-md flex items-center justify-center p-8 min-h-[400px] md:min-h-[500px]">
            <img
              src={mainImage}
              alt={product.productName || product.title}
              className="max-w-full max-h-[400px] object-contain mix-blend-multiply dark:mix-blend-normal transition-all duration-300"
            />
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-start">
          <h1 className="text-2xl xl:text-3xl font-semibold tracking-wide text-black dark:text-white mb-3">
            {product.productName || product.title}
          </h1>

          <div className="flex items-center gap-3 mb-4 text-sm">
            <div className="flex items-center text-[#FFAD33] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating || 4) ? '#FFAD33' : 'transparent'} strokeWidth={1.5} />
              ))}
            </div>
            <span className="text-zinc-400">({product.rating ? '150' : '0'} Reviews)</span>
            <span className="text-zinc-300">|</span>
            <span className="text-[#00FF66] font-medium tracking-wide text-sm">In Stock</span>
          </div>

          <div className="text-2xl font-semibold tracking-wider text-black dark:text-white mb-4">
            ${(product.price || 0).toFixed(2)}
          </div>

          <p className="text-sm text-black dark:text-zinc-300 leading-relaxed tracking-wide border-b border-zinc-300 dark:border-zinc-700 pb-6 mb-6">
            {product.description || 'High quality product designed to deliver premium performance.'}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-lg tracking-wide font-normal text-black dark:text-white">Colours:</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setSelectedColor(0)} className={`w-5 h-5 rounded-full bg-[#A0BCE0] transition-transform ${selectedColor === 0 ? 'ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-black' : 'hover:scale-110'}`} />
              <button onClick={() => setSelectedColor(1)} className={`w-5 h-5 rounded-full bg-[#E07575] transition-transform ${selectedColor === 1 ? 'ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-black' : 'hover:scale-110'}`} />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-lg tracking-wide font-normal text-black dark:text-white min-w-[60px]">Size:</span>
            <div className="flex items-center gap-2.5">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 rounded text-sm font-medium border transition-all duration-150 flex items-center justify-center
                      ${isSelected ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'bg-white dark:bg-black text-black dark:text-white border-zinc-300 dark:border-zinc-600 hover:border-black dark:hover:border-white'}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center border border-zinc-400 dark:border-zinc-600 rounded overflow-hidden h-11">
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3 h-full hover:bg-[#DB4444] hover:text-white transition-colors border-r border-zinc-400 dark:border-zinc-600 text-xl font-light flex items-center justify-center"><Minus size={16} /></button>
              <div className="w-16 text-center font-medium text-base text-black dark:text-white flex items-center justify-center">{quantity}</div>
              <button onClick={() => setQuantity(prev => Math.min(100, prev + 1))} className="px-3 h-full bg-[#DB4444] text-white hover:bg-red-600 transition-colors border-l border-zinc-400 dark:border-zinc-600 text-xl font-light flex items-center justify-center"><Plus size={16} /></button>
            </div>
            <button onClick={handleBuy} className="flex-1 h-11 bg-[#DB4444] text-white rounded font-medium text-base hover:bg-red-600 transition-colors tracking-wide shadow-sm">Buy Now</button>
            <button onClick={toggleLike} className={`w-11 h-11 rounded border flex items-center justify-center transition-all duration-200 ${isLiked ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'bg-white dark:bg-black text-black dark:text-white border-zinc-400 dark:border-zinc-600'}`}><Heart size={20} fill={isLiked ? '#FFFFFF' : 'transparent'} /></button>
          </div>

          <div className="border border-zinc-400 dark:border-zinc-600 rounded-md overflow-hidden">
            <div className="p-4 flex items-center gap-4 border-b border-zinc-400 dark:border-zinc-600">
              <Truck size={28} className="text-black dark:text-white" />
              <div className="flex flex-col gap-1">
                <span className="text-base font-medium text-black dark:text-white">Free Delivery</span>
                <span className="text-xs text-black dark:text-zinc-400 underline cursor-pointer">Enter your postal code</span>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <RotateCcw size={28} className="text-black dark:text-white" />
              <div className="flex flex-col gap-1">
                <span className="text-base font-medium text-black dark:text-white">Return Delivery</span>
                <span className="text-xs text-black dark:text-zinc-400">Free 30 Days Delivery Returns.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='py-10'>
        <Related />
      </div>

    </div>
  );
}