import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';

const API_BASE = 'https://fastcard-1-o23z.onrender.com/api';

export default function SidebarCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [expandedMobileId, setExpandedMobileId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/Category/get-categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleFilter = (catId: number, subName: string | null = null) => {
    navigate(`/product?categoryId=${catId}${subName ? `&subCategory=${encodeURIComponent(subName)}` : ''}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="md:hidden w-full mb-6 px-4 animate-pulse">
          <div className="h-[36px] bg-gray-200 dark:bg-zinc-800 rounded-[4px] mb-4 w-full"></div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[32px] bg-gray-200 dark:bg-zinc-800 rounded w-full"></div>
            ))}
          </div>
        </div>

        <aside className="w-[220px] pt-6 border-r border-gray-200 dark:border-zinc-800 hidden md:block animate-pulse">
          <div className="flex flex-col gap-4 px-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-2/3"></div>
                <div className="h-4 w-4 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
              </div>
            ))}
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      <div className="md:hidden w-full mb-6 px-4">
        <form onSubmit={handleSearchSubmit} className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-zinc-800 dark:text-white p-2 pl-4 pr-10 rounded-[4px] text-sm outline-none" 
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search size={18} className="text-gray-500" />
          </button>
        </form>

        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <div key={cat.id} className="relative">
              <button 
                onClick={() => {
                  handleFilter(cat.id);
                  if (cat.subCategories?.length > 0) {
                    setExpandedMobileId(expandedMobileId === cat.id ? null : cat.id);
                  }
                }}
                className="w-full bg-gray-100 dark:bg-zinc-800 dark:text-white p-2 text-xs text-left rounded flex justify-between items-center"
              >
                <span className="truncate">{cat.categoryName}</span>
                {cat.subCategories?.length > 0 && (
                  expandedMobileId === cat.id ? <ChevronDown size={14}/> : <ChevronRight size={14}/>
                )}
              </button>
              {expandedMobileId === cat.id && (
                <ul className="absolute z-20 w-full mt-1 bg-white dark:bg-zinc-900 border shadow-md rounded text-xs p-2">
                  {cat.subCategories.map((sub: any) => (
                    <li 
                      key={sub.id} 
                      className="py-2 px-1 hover:text-[#DB4444]" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilter(cat.id, sub.subCategoryName);
                      }}
                    >
                      {sub.subCategoryName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <aside className="w-[220px] pt-6 border-r border-gray-200 dark:border-zinc-800 hidden md:block">
        <ul className="flex flex-col gap-3 text-sm dark:text-white">
          {categories.map((cat) => (
            <li key={cat.id} className="cursor-pointer group relative">
              <div className="flex justify-between text-[18px] font-medium items-center p-2 hover:text-[#DB4444]" onClick={() => handleFilter(cat.id)}>
                <span>{cat.categoryName}</span>
                {cat.subCategories?.length > 0 && <ChevronRight size={16} />}
              </div>
              {cat.subCategories?.length > 0 && (
                <div className="absolute left-[210px] top-0 hidden group-hover:block w-[200px] bg-white dark:bg-[#1a1a1a] shadow-xl border rounded-md p-2 z-50">
                  {cat.subCategories.map((sub: any) => (
                    <div 
                      key={sub.id} 
                      className="p-2 text-xs hover:text-[#DB4444]" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleFilter(cat.id, sub.subCategoryName); 
                      }}
                    >
                      {sub.subCategoryName}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}