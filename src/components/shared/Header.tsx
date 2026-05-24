import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

import i1 from "@/assets/Group 1116606595 (2).png";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState<"EN" | "RU">("EN");
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Добавлено состояние для скрытия Sign Up
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // РЕАКТИВНОСТЬ: useSelector подписывает компонент на изменения в Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const [wishlistCount, setWishlistCount] = useState(0);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);

  // Проверяем авторизацию каждый раз при смене роута (чтобы скрылось резко при переходе на главную)
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, [location.pathname]);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    
    const syncWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(savedWishlist.length);
    };

    syncWishlist();
    window.addEventListener('wishlist-updated', syncWishlist);
    return () => {
      window.removeEventListener('wishlist-updated', syncWishlist);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (mobileUserMenuRef.current && !mobileUserMenuRef.current.contains(event.target as Node)) {
        setIsMobileUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "RU" : "EN"));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Удаляем статус авторизации при выходе
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    setIsMobileUserMenuOpen(false);
    navigate("/SignUp");
  };

  const isAuthPage = location.pathname === "/Login" || location.pathname === "/SignUp";
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300 sticky top-0 z-50">

      <div className="flex md:hidden w-full h-16 px-4 items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-black dark:text-white p-1 active:scale-95 transition-transform"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        <Link to="/" className="text-black dark:text-white font-bold text-xl tracking-tight absolute left-1/2 -translate-x-1/2">
          Exclusive
        </Link>

        <div className="flex items-center gap-3">
          {!isAuthPage && (
            <div className="relative" ref={mobileUserMenuRef}>
              <button
                onClick={() => setIsMobileUserMenuOpen(!isMobileUserMenuOpen)}
                className={`p-1 rounded-full transition-all ${isMobileUserMenuOpen ? "text-[#DB4444]" : "text-black dark:text-white"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {isMobileUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-[200px] bg-black/75 backdrop-blur-md rounded-[4px] p-4 flex flex-col gap-4 text-white shadow-2xl z-50 border border-white/10 transition-all duration-200">
                  <Link to="/profile" onClick={() => setIsMobileUserMenuOpen(false)} className="flex items-center gap-3 text-sm font-normal hover:text-zinc-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Account
                  </Link>
                  <Link to="/orders" onClick={() => setIsMobileUserMenuOpen(false)} className="flex items-center gap-3 text-sm font-normal hover:text-zinc-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16v4H4V4zm0 4h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8zm6 4h4v2h-4v-2z" />
                    </svg>
                    My Order
                  </Link>
                  <Link to="/wishlist" onClick={() => setIsMobileUserMenuOpen(false)} className="flex items-center gap-3 text-sm font-normal hover:text-zinc-300 transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="absolute left-3 top-[-4px] bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-sm font-normal hover:text-zinc-300 transition-colors w-full text-left pt-1 border-t border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <Link to="/cart" className="relative text-black dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="hidden md:flex max-w-[1400px] mx-auto h-20 px-6 items-center justify-between">
        <div>
          <img src={i1} alt="" />
        </div>

        <nav className="flex items-center gap-10 text-base font-medium text-black dark:text-white">
          <Link to="/" className={`relative py-1 transition-all ${isActive("/") ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black dark:after:bg-white" : "hover:text-zinc-600 dark:hover:text-zinc-300"}`}>Home</Link>
          <Link to="/Contact" className={`relative py-1 transition-all ${isActive("/Contact") ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black dark:after:bg-white" : "hover:text-zinc-600 dark:hover:text-zinc-300"}`}>Contact</Link>
          <Link to="/About" className={`relative py-1 transition-all ${isActive("/About") ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black dark:after:bg-white" : "hover:text-zinc-600 dark:hover:text-zinc-300"}`}>About</Link>
          
          {/* Скрываем Sign Up если пользователь уже вошел */}
          {!isAuthenticated && (
            <Link to="/SignUp" className={`relative py-1 transition-all ${isActive("/SignUp") ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black dark:after:bg-white" : "hover:text-zinc-600 dark:hover:text-zinc-300"}`}>Sign Up</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative w-[240px]">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full bg-zinc-100 dark:bg-zinc-900 text-xs py-2.5 pl-5 pr-10 rounded-full text-black dark:text-white focus:outline-none placeholder:text-zinc-400 border border-transparent focus:border-zinc-200 dark:focus:border-zinc-800 transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <button onClick={toggleTheme} className="text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 rounded-full transition-colors" aria-label="Toggle theme">
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          <button onClick={toggleLanguage} className="flex items-center gap-1.5 h-9 px-3.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-full text-xs font-bold text-black dark:text-white shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0fa76c" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{lang}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-400 mt-0.5">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <Link to="/wishlist" className="text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 rounded-full transition-all relative block">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white dark:border-zinc-950">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 rounded-full transition-all block">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white dark:border-zinc-950">
                {cartCount}
              </span>
            )}
          </Link>

          {!isAuthPage && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`p-2 rounded-full transition-all ${isUserMenuOpen ? "bg-[#DB4444] text-white" : "text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-[200px] bg-black/75 backdrop-blur-md rounded-[4px] p-4 flex flex-col gap-4 text-white shadow-2xl z-50 border border-white/10 transition-all duration-200">
                  <Link to="/Account" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 text-sm font-normal hover:text-zinc-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Account
                  </Link>
                  <Link to="/orders" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 text-sm font-normal hover:text-zinc-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16v4H4V4zm0 4h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8zm6 4h4v2h-4v-2z" />
                    </svg>
                    My Order
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-sm font-normal hover:text-zinc-300 transition-colors w-full text-left pt-1 border-t border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-[280px] bg-white dark:bg-zinc-900 z-50 p-5 flex flex-col justify-between rounded-r-2xl shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-black dark:text-white font-bold text-lg tracking-tight">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 mt-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors">Home</Link>
            <Link to="/Contact" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors">Contact</Link>
            <Link to="/About" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors">About</Link>
            
            {/* Скрываем Sign Up и из мобильного меню тоже */}
            {!isAuthenticated && (
              <Link to="/SignUp" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors">Sign Up</Link>
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button onClick={toggleTheme} className="flex items-center gap-2 w-full justify-center h-10 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-sm font-semibold text-zinc-800 dark:text-white">
            {isDark ? <span>Light Mode</span> : <span>Dark Mode</span>}
          </button>

          <button onClick={toggleLanguage} className="flex items-center gap-2 w-full justify-center h-10 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-sm font-semibold text-zinc-800 dark:text-white">
            <span>Language: {lang}</span>
          </button>
          
          {/* Если не авторизован, показываем кнопку Login внизу мобильного меню */}
          {!isAuthenticated && (
            <Link to="/Login" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black text-center font-medium py-3 rounded-xl shadow-sm block text-sm">
              Login Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}