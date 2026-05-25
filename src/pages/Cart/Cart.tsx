import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '@/store/store';
import { removeFromCart, clearCart, updateQuantity } from '@/reducers/CartSlice';
import { useNavigate, Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-20 font-sans  dark:text-white transition-colors duration-300">
      <nav className="mb-10 text-sm text-zinc-400">
        <Link to="/" className="hover:text-black dark:hover:text-white">Home</Link> / <span className="text-black dark:text-white font-medium">Cart</span>
      </nav>
      <div className="grid grid-cols-4 px-10 py-6 mb-10 rounded-sm font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 shadow-[0_1px_13px_rgba(0,0,0,0.05)]">
        <span>Product</span>
        <span className="text-center">Price</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Subtotal</span>
      </div>
      <div className="flex flex-col gap-6 mb-6">
        {items.map((item) => {
          const imageUrl = item.image?.startsWith('http') 
            ? item.image 
            : item.image 
              ? `https://fastcard-1-o23z.onrender.com/images/${item.image.replace(/^\/+/, '')}`
              : '/placeholder.png';

          return (
            <div key={item.id} className="group grid grid-cols-4 gap-8 items-center px-10 py-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-sm shadow-[0_1px_13px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="flex items-center gap-5">
                <img src={imageUrl} alt={item.name} className="w-16 h-16 object-contain" />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-center">${item.price}</span>
              <div className="flex justify-center">
                <input 
                  type="number" min="1" value={item.quantity}
                  onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                  className="w-16 p-2 border border-zinc-300 dark:border-zinc-700 bg-transparent rounded-sm text-center"
                />
              </div>
              <div className="flex items-center justify-end gap-6">
                <span>${(item.price * item.quantity)}</span>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))} 
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-10 mt-10">
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="px-10 py-3 border border-zinc-400 dark:border-zinc-600 rounded-sm hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">Return To Shop</button>
          <button className="px-10 py-3 border border-zinc-400 dark:border-zinc-600 rounded-sm hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">Update Cart</button>
        </div>
        <button onClick={() => dispatch(clearCart())} className="px-10 py-3 border border-red-400 text-red-500 rounded-sm hover:bg-red-500 hover:text-white transition-colors">Remove all</button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-10 mt-10">
        <div className="flex lg:flex-row flex-col gap-4 h-14">
          <input placeholder="Coupon Code" className="border border-black dark:border-zinc-600 bg-transparent px-4 rounded-sm lg:py-0 py-1 w-full lg:w-64" />
          <button className="bg-[#DB4444] text-white px-12 py-3 rounded-sm hover:bg-[#b93838] transition-colors">Apply</button>
        </div>

        <div className="w-full md:w-[470px] p-6 border-2 border-black dark:border-zinc-700 rounded-sm">
          <h2 className="text-xl font-medium mb-4">Cart Total</h2>
          <div className="flex justify-between py-3 border-b border-zinc-200 dark:border-zinc-800"><span>Subtotal:</span><span>${subtotal}</span></div>
          <div className="flex justify-between py-3 border-b border-zinc-200 dark:border-zinc-800"><span>Shipping:</span><span>Free</span></div>
          <div className="flex justify-between py-4 font-bold text-lg"><span>Total:</span><span>${subtotal}</span></div>
          <button onClick={() => navigate('/checkout')} className="w-full bg-[#DB4444] text-white py-4 mt-4 rounded-sm hover:bg-[#b93838] transition-colors">Procees to checkout</button>
        </div>
      </div>
    </div>
  );
}