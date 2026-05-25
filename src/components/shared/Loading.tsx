export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-[#DB4444] rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}