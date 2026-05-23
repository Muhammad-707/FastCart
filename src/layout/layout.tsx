import { Outlet } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer"; // Импортируем наш новый футер

export default function Layout() {
  return (
    // Задаем flex-контейнер, чтобы футер всегда прижимался к низу, если контента мало
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
      {/* Шапка сайта */}
      <Header /> 
      
      {/* Основной контент, который растягивается на всю свободную высоту */}
      <main className="flex-grow">
        <Outlet /> 
      </main>
      
      {/* Наш красивый адаптивный футер */}
      <Footer />
    </div>
  );
}