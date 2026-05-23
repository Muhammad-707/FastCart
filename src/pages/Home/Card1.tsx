import React from 'react';

interface Card1Props {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export default function Card1({ icon, label, isActive }: Card1Props) {
  return (
    // Добавляем класс 'group' для управления состоянием при наведении
    <div className={`group flex flex-col items-center justify-center gap-4 w-[170px] h-[145px] border rounded transition-all duration-300 cursor-pointer ${
      isActive 
        ? "bg-[#DB4444] text-white border-[#DB4444]" 
        : "bg-white text-black border-zinc-200 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]"
    }`}>
      
      {/* Оборачиваем иконку в div. 
        При наведении на карточку (group-hover), иконка автоматически станет белой,
        если внутри иконки (SVG) stroke/fill установлен в 'currentColor'.
      */}
      <div className="text-3xl transition-colors duration-300 group-hover:text-white">
        {icon}
      </div>
      
      <span className="text-base font-medium">{label}</span>
    </div>
  );
}