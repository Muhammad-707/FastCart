import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Banner from "./Banner";
import SidebarCategories from "./SideBarCategory";

import appleLogo from "@/assets/1200px-Apple_gray_logo 1 (1).png";
import i2 from "@/assets/images (2).jpg"
import i3 from "@/assets/Без названия.jpg"
import i4 from "@/assets/Без названия (1).jpg"
import i5 from "@/assets/iPad-Air-2.webp"
import i6 from "@/assets/images.jpg"

import { useTranslation } from "react-i18next";

export default function Section1() {
  const { t } = useTranslation();

  const banners = [
    {
      logo: appleLogo,
      image: i3,
      title: "MacBook Pro M4",
      subtitle: `${t("text59")} 5% ${t("text59a")}`,
      buttonText: t("text60"),
      imageWidth: "w-full md:w-[600px]", 
    },
    {
      logo: appleLogo,
      image: i2,
      title: "iPhone 17 Pro Max",
      subtitle: `${t("text59")} 10% ${t("text59a")}`,
      buttonText: t("text60"),
      imageWidth: "w-full md:w-[600px]",
    },
    {
      logo: appleLogo,
      image: i4,
      title: "AirPods Pro",
      subtitle: `${t("text59")} 20% ${t("text59a")}`,
      buttonText: t("text60"),
      imageWidth: "w-full md:w-[600px]", 
    },
    {
      logo: appleLogo,
      image: i5,
      title: "iPad Air",
      subtitle: `${t("text59")} 15% ${t("text59a")}`,
      buttonText: t("text60"),
      imageWidth: "w-full md:w-[600px]", 
    },
    {
      logo: appleLogo,
      image: i6,
      title: "Apple Watch",
      subtitle: `${t("text59")} 20% ${t("text59a")}`,
      buttonText: t("text60"),
      imageWidth: "w-full md:w-[600px]", 
    },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="md:hidden">
        <SidebarCategories />

        <Swiper className="w-full h-[500px] mb-6">
          {banners.map((el, index) => (
            <SwiperSlide key={index}>
              <Banner
                logo={el.logo}
                image={el.image}
                title={el.title}
                subtitle={el.subtitle}
                buttonText={el.buttonText}
                imageWidth={el.imageWidth} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:flex gap-10">
        <SidebarCategories />

        <div className="flex-1 overflow-hidden pt-6">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="w-full lg:h-[420px] h-[500px]"
          >
            {banners.map((el, index) => (
              <SwiperSlide key={index}>
                <Banner
                  logo={el.logo}
                  image={el.image}
                  title={el.title}
                  subtitle={el.subtitle}
                  buttonText={el.buttonText}
                  imageWidth={el.imageWidth} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}