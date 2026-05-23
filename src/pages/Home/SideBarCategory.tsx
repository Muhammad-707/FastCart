import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, Search } from 'lucide-react'; // Добавили Search

const API_BASE = 'https://fastcard-1-o23z.onrender.com/api';

export default function SidebarCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [expandedMobileId, setExpandedMobileId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/Category/get-categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch((err) => console.error("Ошибка:", err));
  }, []);

  const handleFilter = (catId: number, subName: string | null = null) => {
    navigate(`/products?categoryId=${catId}${subName ? `&subCategory=${subName}` : ''}`);
  };

  return (
    <>
      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      <div className="md:hidden w-full mb-6 px-4">
        {/* Поиск добавлен только здесь */}
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-gray-100 dark:bg-zinc-800 dark:text-white p-2 pl-4 pr-10 rounded-[4px] text-sm outline-none" 
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <div key={cat.id} className="relative">
              <button 
                onClick={() => cat.subCategories?.length > 0 ? setExpandedMobileId(expandedMobileId === cat.id ? null : cat.id) : handleFilter(cat.id)}
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
                    <li key={sub.id} className="py-2 px-1 hover:text-[#DB4444]" onClick={() => handleFilter(cat.id, sub.subCategoryName)}>
                      {sub.subCategoryName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ДЕСКТОПНАЯ ВЕРСИЯ */}
      <aside className="w-[220px] pt-6 border-r border-gray-200 dark:border-zinc-800 hidden md:block">
        <ul className="flex flex-col gap-3 text-sm dark:text-white">
          {categories.map((cat) => (
            <li key={cat.id} className="cursor-pointer group relative">
              <div className="flex justify-between items-center p-2 hover:text-[#DB4444]" onClick={() => handleFilter(cat.id)}>
                <span>{cat.categoryName}</span>
                {cat.subCategories?.length > 0 && <ChevronRight size={16} />}
              </div>
              {cat.subCategories?.length > 0 && (
                <div className="absolute left-[210px] top-0 hidden group-hover:block w-[200px] bg-white dark:bg-[#1a1a1a] shadow-xl border rounded-md p-2 z-50">
                  {cat.subCategories.map((sub: any) => (
                    <div key={sub.id} className="p-2 text-xs hover:text-[#DB4444]" onClick={(e) => { e.stopPropagation(); handleFilter(cat.id, sub.subCategoryName); }}>
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