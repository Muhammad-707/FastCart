import React from 'react';

interface Card1Props {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isLoading?: boolean;
}

export default function Card1({ icon, label, isActive, isLoading }: Card1Props) {
  if (isLoading) {
    return (
      <div className="w-[170px] h-[145px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded animate-pulse flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className={`group flex flex-col items-center justify-center gap-4 w-[170px] h-[145px] border rounded transition-all duration-300 cursor-pointer ${
      isActive 
        ? "bg-[#DB4444] text-white border-[#DB4444]" 
        : "bg-white text-black border-zinc-200 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]"
    }`}>
      
      <div className="text-3xl transition-colors duration-300 group-hover:text-white">
        {icon}
      </div>
      
      <span className="text-base font-medium">{label}</span>
    </div>
  );
}