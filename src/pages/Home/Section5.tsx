import { useEffect, useState, useRef } from 'react';
import i1 from "@/assets/JBL_BOOMBOX_2_HERO_020_x1 (1) 1 (2).png"
import { useTranslation } from "react-i18next";

export default function Section5() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`max-w-[1400px] mx-auto px-6 py-10 md:py-20 overflow-hidden relative ${isVisible ? 'is-visible' : ''}`}
    >
      <style>{`
        .promo-text {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .promo-img {
          opacity: 0;
          transform: scale(0.95) translateX(30px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-visible .promo-text {
          opacity: 1;
          transform: translateY(0);
        }
        .is-visible .promo-img {
          opacity: 1;
          transform: scale(1) translateX(0);
        }
      `}</style>

      <div className="bg-black w-full min-h-[500px] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 rounded-sm overflow-hidden">
        <div className="promo-text flex flex-col gap-6 md:gap-8 z-10 text-white w-full md:w-1/2 items-center md:items-start text-center md:text-left">
          <span className="text-[#00FF66] font-semibold text-sm md:text-base">{t("text73")}</span>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tighter">
            {t("text74")} <br className="hidden md:block" /> {t("text75")}
          </h2>

          <div className="flex gap-3 md:gap-4">
            <div className="bg-white w-[55px] h-[55px] md:w-[62px] md:h-[62px] rounded-full flex flex-col items-center justify-center text-black">
              <span className="text-xs md:text-sm font-bold">23</span>
              <span className="text-[9px] md:text-[10px]">{t("text64")}</span>
            </div>
            <div className="bg-white w-[55px] h-[55px] md:w-[62px] md:h-[62px] rounded-full flex flex-col items-center justify-center text-black">
              <span className="text-xs md:text-sm font-bold">05</span>
              <span className="text-[9px] md:text-[10px]">{t("text63")}</span>
            </div>
            <div className="bg-white w-[55px] h-[55px] md:w-[62px] md:h-[62px] rounded-full flex flex-col items-center justify-center text-black">
              <span className="text-xs md:text-sm font-bold">59</span>
              <span className="text-[9px] md:text-[10px]">{t("text65")}</span>
            </div>
            <div className="bg-white w-[55px] h-[55px] md:w-[62px] md:h-[62px] rounded-full flex flex-col items-center justify-center text-black">
              <span className="text-xs md:text-sm font-bold">35</span>
              <span className="text-[9px] md:text-[10px]">{t("text66")}</span>
            </div>
          </div>

          <button className="bg-[#00FF66] text-black font-medium px-8 py-3 md:px-10 md:py-4 w-max rounded-sm hover:bg-[#00cc52] transition-colors">
           {t("text75")}
          </button>
        </div>

        <div className="promo-img w-full md:w-1/2 flex items-center justify-center relative mb-6 md:mb-0">
          <div className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-white opacity-10 md:opacity-20 rounded-full blur-[60px] md:blur-[100px]"></div>
          <img
            src={i1}
            alt="JBL Speaker"
            className="relative h-[200px] md:h-[330px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}