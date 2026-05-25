import Card1 from './Card1';
import { Store, CircleDollarSign, Package, HandCoins } from 'lucide-react'; 
import { useTranslation } from "react-i18next";


export default function Section2() {
  const { t } = useTranslation();
  const stats = [
    { icon: <Store size={30} />, value: "10.5k", label: `${t("text169")}` },
    { icon: <CircleDollarSign size={30} />, value: "33k", label: `${t("text170")}` },
    { icon: <Package size={30} />, value: "45.5k", label: `${t("text171")}` },
    { icon: <HandCoins size={30} />, value: "25k", label: `${t("text172")}` },
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