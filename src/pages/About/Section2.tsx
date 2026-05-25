import Card1 from './Card1';
import { Store, CircleDollarSign, Package, HandCoins } from 'lucide-react'; 

export default function Section2() {
  const stats = [
    { icon: <Store size={30} />, value: "10.5k", label: "Sallers active our site" },
    { icon: <CircleDollarSign size={30} />, value: "33k", label: "Mopnthly Product Sale" },
    { icon: <Package size={30} />, value: "45.5k", label: "Customer active in our site" },
    { icon: <HandCoins size={30} />, value: "25k", label: "Anual gross sale in our site" },
  ];

  return (
    <section className="w-full py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card1 
              key={index} 
              icon={stat.icon} 
              value={stat.value} 
              label={stat.label} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}