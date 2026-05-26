import { Link } from "react-router-dom";

type BannerProps = {
  logo: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageWidth?: string;
};

export default function Banner({
  logo,
  image,
  title,
  subtitle,
  buttonText,
  imageWidth = "w-full md:w-[500px]",
}: BannerProps) {

  return (
    <div className="group bg-black w-full h-[500px] lg:h-[420px] lg:py-0 py-20 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-10 text-white rounded-4xl overflow-hidden relative border border-zinc-800/40 shadow-2xl">
      <style>{`
        .swiper-slide .banner-title-anim {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .swiper-slide .banner-text-anim {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
        }
        .swiper-slide .banner-btn-anim {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
        }
        .swiper-slide .banner-img-anim {
          opacity: 0;
          transform: scale(0.9) translateX(30px);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        .swiper-slide-active .banner-title-anim,
        .swiper-slide-active .banner-text-anim,
        .swiper-slide-active .banner-btn-anim {
          opacity: 1;
          transform: translateY(0);
        }
        
        .swiper-slide-active .banner-img-anim {
          opacity: 1;
          transform: scale(1) translateX(0);
        }

        @keyframes bannerMicroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .swiper-slide-active .banner-float-loop {
          animation: bannerMicroFloat 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] bg-[#DB4444]/10 rounded-full blur-[130px] pointer-events-none transition-all duration-700 group-hover:bg-[#DB4444]/15 group-hover:scale-125" />
      <div className="absolute left-1/4 bottom-0 w-[200px] h-[200px] bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center md:items-start justify-center gap-5 z-10 w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <div className="banner-title-anim flex items-center gap-3 bg-zinc-900/60 backdrop-blur-md py-1.5 px-4 rounded-full border border-zinc-800">
          <img
            src={logo}
            alt="logo"
            className="w-6 h-6 object-contain transition-transform duration-500 group-hover:rotate-12"
          />
          <span className="text-sm font-medium tracking-wider text-zinc-300 uppercase">{title}</span>
        </div>

        <h1 className="banner-text-anim text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-400">
          {subtitle}
        </h1>

        <Link
          to="/product"
          className="banner-btn-anim flex items-center gap-2 mt-2 group/btn cursor-pointer inline-flex select-none"
        >
          <span className="border-b border-zinc-500 text-slate-200 group-hover/btn:border-white pb-1 font-medium transition-colors duration-300">
            {buttonText}
          </span>
          <span className="text-xl transition-transform duration-300 group-hover/btn:translate-x-2 text-[#DB4444]">
            →
          </span>
        </Link>
      </div>

      <div className={`${imageWidth} h-[50%] md:h-full flex items-center justify-center md:justify-end mt-2 md:mt-0 z-10 relative`}>
        <div className="banner-img-anim w-full h-full flex items-center justify-center md:justify-end">
          <div className="banner-float-loop w-full h-full flex items-center justify-center md:justify-end transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-1">
            <img
              src={image}
              alt="banner"
              className="w-full h-[85%] md:h-[90%] object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.85)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}