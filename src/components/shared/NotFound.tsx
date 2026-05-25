import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-300 px-6 py-20 text-center">
      <h1 className="text-[100px] md:text-[160px] font-bold text-black dark:text-white tracking-tighter leading-none mb-4">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-6">
        Page Not Found
      </h2>

      <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-sm">
        Упс! Страница, которую вы ищете, не существует или была перемещена.
      </p>

      <Link 
        to="/"
        className="px-10 py-4 bg-[#DB4444] text-white font-medium rounded-sm shadow-lg hover:shadow-red-500/30 hover:bg-[#b93a3a] transition-all duration-300"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};