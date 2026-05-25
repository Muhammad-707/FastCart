import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


import i1 from "@/assets/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png"

export default function Section1() {
  const { t } = useTranslation();
  return (
    <section className="w-full py-10 md:py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-12">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">
            {t("text1")}
          </Link>
          <span>/</span>
          <Link to="/about" className="text-black dark:text-white font-medium hover:underline">
            {t("text3")}
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-[54px] font-semibold text-black dark:text-white tracking-tight leading-[1.2]">
              {t("text166")}
            </h1>
            <div className="flex flex-col gap-6 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                {t("text167")}
              </p>
              <p>
                {t("text168")}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full h-auto rounded-md overflow-hidden shadow-sm">
              <img
                src={i1}
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}