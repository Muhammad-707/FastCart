import { useEffect, useState, useRef } from 'react';
import i1 from "@/assets/ps5-slim-goedkope-playstation_large 1 (1).png"
import i2 from "@/assets/attractive-woman-wearing-hat-posing-black-background 1 (2).png"
import i3 from "@/assets/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.png"
import i4 from "@/assets/652e82cd70aa6522dd785109a455904c (1).png"
import { useTranslation } from "react-i18next";

export default function Section7() {
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
      className={`max-w-[1400px] mx-auto px-6 py-20 overflow-hidden relative ${isVisible ? 'is-visible' : ''}`}
    >
      <style>{`
        .reveal-header {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stagger-block {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-visible .reveal-header {
          opacity: 1;
          transform: translateY(0);
        }
        .is-visible .stagger-block {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>

      <div className="reveal-header flex items-center gap-3 mb-6">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <span className="text-[#DB4444] font-semibold">{t("text79")}</span>
      </div>
      <h2 className="reveal-header text-3xl font-semibold tracking-wider mb-10 dark:text-white" style={{ transitionDelay: '0.05s' }}>{t("text80")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto">
        <div className="stagger-block bg-black relative rounded-sm flex flex-col justify-end p-8 text-white min-h-[400px] md:min-h-[600px]" style={{ transitionDelay: '0.1s' }}>
          <img src={i1} alt="PS5" className="absolute inset-0 w-full h-full object-contain p-4" />
          <div className="relative z-10 flex flex-col gap-2 w-full md:w-1/2">
            <h3 className="text-2xl font-semibold">{t("text81")}</h3>
            <p className="text-sm text-gray-300">{t("text82")}</p>
            <a href="#" className="underline underline-offset-8 mt-2 font-medium">{t("text83")}</a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="stagger-block bg-[#0D0D0D] h-[300px] md:h-[285px] rounded-sm flex items-center justify-between text-white relative overflow-hidden" style={{ transitionDelay: '0.2s' }}>
            <div className="relative z-10 flex flex-col gap-2 w-1/2 md:w-2/5 pl-8">
              <h3 className="text-2xl font-semibold">{t("text84")}</h3>
              <p className="text-sm text-gray-300">{t("text85")}</p>
              <a href="#" className="underline underline-offset-8 mt-2 font-medium">{t("text60")}</a>
            </div>
            <img src={i2} alt="Woman" className="h-full right-0 object-cover"/>
          </div>

          <div className="grid grid-cols-2 gap-8 h-[300px] md:h-[285px]">
            <div className="stagger-block bg-black rounded-sm flex flex-col justify-end p-6 text-white relative" style={{ transitionDelay: '0.3s' }}>
              <img src={i3} alt="Speakers" className="absolute inset-0 w-full h-full object-contain p-4" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">{t("text86")}</h3>
                <p className="text-xs text-gray-300 mt-1">{t("text87")}</p>
                <a href="#" className="underline underline-offset-8 mt-2 text-sm">{t("text60")}</a>
              </div>
            </div>

            <div className="stagger-block bg-black rounded-sm flex flex-col justify-end p-6 text-white relative" style={{ transitionDelay: '0.4s' }}>
              <img src={i4} alt="Perfume" className="absolute inset-0 w-full h-full object-contain p-4" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">{t("text88")}</h3>
                <p className="text-xs text-gray-300 mt-1">{t("text89")}</p>
                <a href="#" className="underline underline-offset-8 mt-2 text-sm">{t("text60")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}