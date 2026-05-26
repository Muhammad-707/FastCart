import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id?: number;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

export const Card4: React.FC<Props> = ({ id, icon, label, isActive, onClick, isLoading }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (id !== undefined) {
      navigate(`/product?categoryId=${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[145px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-sm animate-pulse flex flex-col items-center justify-center gap-4">
        <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer flex flex-col items-center justify-center gap-4 w-full h-[145px] border rounded-sm transition-all duration-300
        ${isActive 
          ? 'bg-[#DB4444] text-white border-none' 
          : 'bg-white dark:bg-zinc-900 text-black dark:text-white border-zinc-200 dark:border-zinc-800 hover:bg-[#DB4444] hover:text-white hover:border-transparent'}
      `}
    >
      <div className="transition-colors duration-300">
        {icon}
      </div>
      <span className="text-base font-normal text-center px-2">
        {label}
      </span>
    </div>
  );
};