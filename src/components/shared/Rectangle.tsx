import React from 'react';
import { Truck, Headphones, ShieldCheck } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 mb-6 transition-colors duration-300">
      <div className="w-14 h-14 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black transition-colors duration-300">
        {icon}
      </div>
    </div>
    <h3 className="font-semibold text-xl text-black dark:text-white uppercase mb-2 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-sm text-black dark:text-zinc-400 transition-colors duration-300">
      {description}
    </p>
  </div>
);

export default function ServicesSection() {
  return (
    <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-12">
        
        <ServiceCard 
          icon={<Truck size={30} strokeWidth={2} />}
          title="FREE AND FAST DELIVERY"
          description="Free delivery for all orders over $140"
        />

        <ServiceCard 
          icon={<Headphones size={30} strokeWidth={2} />}
          title="24/7 CUSTOMER SERVICE"
          description="Friendly 24/7 customer support"
        />

        <ServiceCard 
          icon={<ShieldCheck size={30} strokeWidth={2} />}
          title="MONEY BACK GUARANTEE"
          description="We return money within 30 days"
        />

      </div>
    </section>
  );
}