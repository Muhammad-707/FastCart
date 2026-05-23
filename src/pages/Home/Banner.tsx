import appleLogo from "@/assets/1200px-Apple_gray_logo 1 (1).png";
import iphoneImg from "@/assets/hero_endframe__cvklg0xk3w6e_large 2 (1).png";

export default function Banner() {
  return (
    <div className="bg-black w-full h-[500px] lg:h-[420px] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-10 text-white rounded-4xl overflow-hidden">
      <div className="flex flex-col items-center md:items-start justify-center gap-5 z-10 w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <div className="flex items-center gap-3">
          <img src={appleLogo} alt="Apple" className="w-12 h-14 object-contain" />
          <span className="text-sm">iPhone 14 Series</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
          Up to 10% <br /> off Voucher
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <a href="#" className="border-b border-white pb-1 font-medium">Shop Now</a>
          <span className="text-xl">→</span>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-[50%] md:h-full flex items-center justify-center md:justify-end mt-2 md:mt-0">
        <img src={iphoneImg} alt="iPhone 14" className="h-full object-contain" />
      </div>
    </div>
  );
}