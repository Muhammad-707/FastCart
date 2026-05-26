export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-zinc-200 dark:border-zinc-800"></div>
          
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#DB4444] animate-spin"></div>
          
          <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-[#DB4444] animate-spin [animation-direction:reverse] [animation-duration:800ms]"></div>
          
          <div className="absolute inset-4 bg-[#DB4444]/20 dark:bg-[#DB4444]/40 rounded-full blur-md animate-pulse"></div>
          
          <div className="w-2.5 h-2.5 bg-[#DB4444] rounded-full animate-ping"></div>
        </div>
        
        <div className="flex items-center gap-1">
          <p className="text-sm font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase">
            Loading
          </p>
          <span className="flex gap-0.5">
            <span className="w-1 h-1 bg-[#DB4444] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-[#DB4444] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-[#DB4444] rounded-full animate-bounce"></span>
          </span>
        </div>
      </div>
    </div>
  );
}