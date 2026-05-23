import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="w-9 h-9 flex items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200 active:scale-95 focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-[18px] h-[18px] text-amber-500 animate-in fade-in zoom-in-75 duration-200" />
      ) : (
        <Moon className="w-[18px] h-[18px] animate-in fade-in zoom-in-75 duration-200" />
      )}
    </button>
  );
}