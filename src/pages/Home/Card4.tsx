import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id?: number;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const Card4: React.FC<Props> = ({ id, icon, label, isActive, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (id !== undefined) {
      navigate(`/product?categoryId=${id}`);
    }
  };

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