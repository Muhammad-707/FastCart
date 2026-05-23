import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className="w-full py-10 md:py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Навигация */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-10 md:mb-20">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white font-medium">My Account</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Боковое меню */}
          <aside className="w-full md:w-[250px] flex flex-col gap-6 text-sm text-zinc-500">
            <div>
              <h4 className="font-medium text-black dark:text-white mb-4">Manage My Account</h4>
              <div className="flex flex-col gap-2 pl-4">
                <span className="text-[#DB4444] cursor-pointer">My Profile</span>
                <span className="cursor-pointer hover:text-black dark:hover:text-white">Address Book</span>
                <span className="cursor-pointer hover:text-black dark:hover:text-white">My Payment Options</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-black dark:text-white mb-4">My Orders</h4>
              <div className="flex flex-col gap-2 pl-4">
                <span className="cursor-pointer hover:text-black dark:hover:text-white">My Returns</span>
                <span className="cursor-pointer hover:text-black dark:hover:text-white">My Cancellations</span>
              </div>
            </div>
            <h4 className="font-medium text-black dark:text-white cursor-pointer hover:text-[#DB4444]">My WishList</h4>
          </aside>

          {/* Форма */}
          <main className="flex-grow p-6 md:p-10 shadow-md rounded-sm bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-medium text-[#DB4444] mb-6">Edit Your Profile</h2>
            
            <form className="flex flex-col gap-6">
              {/* Первая строка полей */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-sm text-zinc-500">First name</label>
                  <input type="text" defaultValue="Md" className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 rounded-sm outline-none text-sm text-black dark:text-white" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-sm text-zinc-500">Last name</label>
                  <input type="text" defaultValue="Rimel" className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 rounded-sm outline-none text-sm text-black dark:text-white" />
                </div>
              </div>

              {/* Вторая строка полей */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-sm text-zinc-500">Email address</label>
                  <input type="email" defaultValue="rimel1111@gmail.com" className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 rounded-sm outline-none text-sm text-black dark:text-white" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-sm text-zinc-500">Street address</label>
                  <input type="text" defaultValue="Kingston, 5236, United State" className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 rounded-sm outline-none text-sm text-black dark:text-white" />
                </div>
              </div>
              
              {/* Пароли */}
              <div className="flex flex-col gap-4 mt-2">
                <h4 className="text-base text-zinc-600 dark:text-zinc-400">Password Changes</h4>
                <input type="password" placeholder="Current password" className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 rounded-sm outline-none text-sm text-black dark:text-white" />
                <input type="password" placeholder="New password" className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 rounded-sm outline-none text-sm text-black dark:text-white" />
                <input type="password" placeholder="Confirm new password" className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 rounded-sm outline-none text-sm text-black dark:text-white" />
              </div>

              {/* Кнопки */}
              <div className="flex justify-end gap-6 items-center mt-4">
                <button type="button" className="text-base hover:underline dark:text-zinc-300">Cancel</button>
                <button type="submit" className="bg-[#DB4444] text-white px-8 md:px-12 py-3 md:py-4 rounded-sm hover:bg-red-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}