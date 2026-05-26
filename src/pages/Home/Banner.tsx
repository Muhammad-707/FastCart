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
    <div className="bg-black w-full h-[500px] lg:h-[420px] lg:py-0 py-20 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-10 text-white rounded-4xl overflow-hidden">
      <div className="flex flex-col items-center md:items-start justify-center gap-5 z-10 w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-14 object-contain"
          />
          <span className="text-xl pt-3">{title}</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
          {subtitle}
        </h1>

        <div className="flex items-center gap-2 mt-2">
          <a href="#" className="border-b border-white pb-1 font-medium">
            {buttonText}
          </a>

          <span className="text-xl">→</span>
        </div>
      </div>

      {/* Контейнер для изображения */}
      <div className={`${imageWidth} h-[50%] md:h-full flex items-center justify-center md:justify-end mt-2 md:mt-0`}>
        <img
          src={image}
          alt="banner"
          // Добавили w-full, чтобы картинка заполняла контейнер по ширине
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}