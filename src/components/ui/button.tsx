import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = ({ children, onClick, className = '', variant = 'default', size = 'md' }: Props) => {
  const base = 'rounded transition-colors focus-visible:outline-none';
  const variants = {
    default: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    ghost: 'hover:bg-primary/10',
  };
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
    icon: 'p-2',
  };
  return (
    <button onClick={onClick} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </button>
  );
};
