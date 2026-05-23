import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export default function Card1({ icon, value, label }: CardProps) {
  return (
    <div className="group border border-zinc-300 dark:border-zinc-700 rounded-md p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-[#DB4444] dark:hover:bg-[#DB4444] hover:border-transparent cursor-pointer">
      {/* Контейнер иконки */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-white/30 transition-colors">
        <div className="w-14 h-14 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black group-hover:bg-white dark:group-hover:bg-white group-hover:text-black transition-colors">
          {icon}
        </div>
      </div>
      
      {/* Текст */}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-[32px] font-bold text-black dark:text-white group-hover:text-white transition-colors">
          {value}
        </h3>
        <p className="text-sm text-black dark:text-zinc-400 group-hover:text-white transition-colors text-center">
          {label}
        </p>
      </div>
    </div>
  );
}