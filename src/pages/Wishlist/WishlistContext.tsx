import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext<any>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const toggleWishlist = (product: any) => {
    setWishlist((prev) => {
      const isExists = prev.find((item) => item.id === product.id);
      const newList = isExists 
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
      localStorage.setItem("wishlist", JSON.stringify(newList));
      return newList;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);