import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { items } = useSelector((state: RootState) => state.cart);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-[1300px] mx-auto px-6 pt-10 pb-20 font-sans  dark:text-white transition-colors duration-300">
      
      {/* НАВИГАЦИЯ */}
      <nav className="mb-20 text-sm text-zinc-400">
        <Link to="/" className="hover:text-black dark:hover:text-zinc-200">Account</Link> / 
        <Link to="/cart" className="hover:text-black dark:hover:text-zinc-200"> My Cart</Link> / 
        <span className="text-black dark:text-white font-medium"> CheckOut</span>
      </nav>

      <h1 className="text-4xl font-semibold mb-12">Billing Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[150px] items-start">
        
        {/* ЛЕВАЯ ЧАСТЬ: ФОРМА */}
        <div className="bg-white lg:w-[500px] dark:bg-zinc-900 p-8 rounded shadow-lg border border-zinc-100 dark:border-zinc-800 transition-colors">
          <div className="flex flex-col gap-6">
            {[
              "First name", "Last name", "Street address", 
              "Apartment, floor, etc. (optional)", "Town/City", 
              "Phone number", "Email address"
            ].map((placeholder) => (
              <input 
                key={placeholder}
                type="text" 
                placeholder={placeholder}
                className="bg-zinc-50 dark:bg-black w-full h-12 px-4 rounded border border-zinc-200 dark:border-zinc-700 outline-none focus:border-black dark:focus:border-white transition-all placeholder-zinc-400 dark:placeholder-zinc-600" 
              />
            ))}
            
            <label className="flex items-center gap-3 cursor-pointer mt-2">
              <input 
                type="checkbox" 
                className="w-6 h-6 accent-[#DB4444] rounded border-zinc-300" 
              />
              <span className="text-sm">Save this information for faster check-out next time</span>
            </label>
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: ИТОГИ */}
        <div className="flex flex-col gap-8 w-full lg:max-w-[470px]">
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping:</span><span>Free</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>${subtotal.toFixed(2)}</span></div>
          </div>

          <div className="space-y-6">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3 font-medium">
                <input type="radio" name="pay" className="w-5 h-5 accent-black dark:accent-white" /> Bank
              </div>
              {/* ЧЕТЫРЕ ИКОНКИ ПЛАТЕЖНЫХ СИСТЕМ */}
              <div className="flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="w-8 h-5 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="w-8 h-5 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Bkash_logo.png/1200px-Bkash_logo.png" alt="bKash" className="w-8 h-5 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png" alt="Nagad" className="w-8 h-5 object-contain" />
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="pay" className="w-5 h-5 accent-black dark:accent-white" /> Cash on delivery
            </label>
            
            <div className="flex lg:flex-row flex-col gap-4">
              <input placeholder="Coupon Code" className="border border-black dark:border-zinc-700 bg-transparent px-4 py-3 flex-1 rounded-sm outline-none" />
              <button className="bg-[#DB4444] text-white px-10 py-3 rounded-sm hover:bg-[#b93838] transition-colors">Apply</button>
            </div>
            
            <button className="bg-[#DB4444] text-white px-12 py-4 rounded-sm w-full hover:bg-[#b93838] transition-colors">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}