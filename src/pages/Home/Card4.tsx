import React from 'react';

interface Props {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const Card4: React.FC<Props> = ({ icon, label, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer flex flex-col items-center justify-center gap-4 w-full h-[145px] border rounded-sm transition-all duration-300
        ${isActive 
          ? 'bg-[#DB4444] text-white border-none' 
          : 'bg-white text-black border-zinc-200 hover:bg-[#DB4444] hover:text-white hover:border-transparent'}
      `}
    >
      {/* Иконка теперь будет разной для каждой категории */}
      <div className="transition-colors duration-300">
        {icon}
      </div>
      <span className="text-base font-normal">
        {label}
      </span>
    </div>
  );
};