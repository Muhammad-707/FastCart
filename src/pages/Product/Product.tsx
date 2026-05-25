import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/reducers/ProductSlice';
import { type RootState, type AppDispatch } from '@/store/store';
import { type FilterState, setCategory, setSubCategory, setSearch } from '../../reducers/FilterSlice';
import Card1 from '@/pages/Product/Card1';
import Sidebar from '@/pages/Product/Sidebar';
import { LayoutGrid, List } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ProductPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);
  const filters = useSelector((state: RootState) => state.filters as FilterState);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    const subCategory = searchParams.get('subCategory');
    const search = searchParams.get('search');

    dispatch(setCategory(categoryId ? Number(categoryId) : null));
    dispatch(setSubCategory(subCategory ? subCategory : null));
    dispatch(setSearch(search ? search : ''));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
    setVisibleCount(9);
  }, [dispatch, filters.categoryId, filters.brandId, filters.minPrice, filters.maxPrice, filters.search]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filters.rating) {
        if (Math.floor(item.rating || 0) !== filters.rating) {
          return false;
        }
      }

      return true;
    });
  }, [items, filters.rating, filters.condition]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen pb-20 font-sans text-black dark:text-zinc-100 transition-colors duration-200">
      <div className="bg-white dark:bg-zinc-950 py-6 mb-4 border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className='flex items-center gap-3 cursor-pointer'>
            <p onClick={() => navigate("/")} className="text-xs text-gray-400 dark:text-zinc-500 hover:text-black">Home / </p>
            <p className="text-xs text-black dark:text-white font-normal">Explore Our Products</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-[240px] shrink-0">
          <Sidebar />
        </aside>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 w-full">
            <div className="text-sm text-gray-500 dark:text-zinc-400">
              Found <span className="font-semibold text-black dark:text-white">{filteredItems.length}</span> items
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex gap-2 pr-2">
                <button className="p-1 text-black dark:text-white"><LayoutGrid size={18} /></button>
                <button className="p-1 text-gray-300 dark:text-zinc-700"><List size={18} /></button>
              </div>
              <div className="border border-gray-300 dark:border-zinc-800 rounded px-3 py-1.5 bg-transparent min-w-[140px] flex justify-between items-center">
                <select className="border-none text-sm text-black dark:text-white bg-transparent focus:ring-0 cursor-pointer outline-none w-full pr-4">
                  <option className="bg-white dark:bg-zinc-900">Popularity</option>
                  <option className="bg-white dark:bg-zinc-900">Price: Low to High</option>
                  <option className="bg-white dark:bg-zinc-900">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-gray-200 dark:border-zinc-800 border-t-[#DB4444] dark:border-t-[#DB4444] rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <div className="p-16 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-300 mb-2">No products found</h3>
                  <p className="text-gray-500 dark:text-zinc-500">Try adjusting your filters or search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems.slice(0, visibleCount).map((product) => (
                    <Card1
                      key={product.id}
                      image={product.image.includes('http') ? product.image : `https://fastcard-1-o23z.onrender.com/images/${product.image}`}
                      title={product.productName}
                      price={`$${product.hasDiscount ? product.discountPrice : product.price}`}
                      reviews={product.rating || 0}
                    />
                  ))}
                </div>
              )}

              {visibleCount < filteredItems.length && (
                <div className="mt-16 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-12 py-3.5 bg-[#DB4444] text-white font-medium rounded hover:bg-[#c23b3b] transition-all duration-200 shadow-sm"
                  >
                    More Products
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}