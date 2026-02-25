"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import sliderImg from "@/public/home-slider-1.png";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Premium Collection",
    subtitle: "Discover Elegance",
    description:
      "Explore our exclusive range of premium products crafted for perfection",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "Summer Sale",
    subtitle: "Up to 50% Off",
    description:
      "Limited time offers on selected items. Don't miss out on amazing deals",
    buttonText: "Explore Deals",
    buttonLink: "/products",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Fresh Styles",
    description:
      "Check out the latest trends and must-have items for this season",
    buttonText: "View Collection",
    buttonLink: "/products",
  },
];

export default function HomeSlider() {
  return (
    <>
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{delay: 5000}}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="bg-indigo-500/80 w-full h-full px-12">
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${sliderImg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Color Overlay */}
                <div className="absolute inset-0 bg-indigo-500/80" />

                {/* Content Container */}
                <div className="relative h-full flex items-center justify-start px-6 md:px-16">
                  <div className="max-w-2xl w-full">
                    {/* Badge */}
                    <div className="mb-2 md:mb-3 inline-block">
                      <span className="text-white/80 text-xs md:text-sm font-medium tracking-widest uppercase">
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-white/90 text-sm md:text-base mb-5 md:mb-6 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <Link href={slide.buttonLink}>
                      <button className="group relative px-6 md:px-8 py-2 md:py-3 bg-white text-gray-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                        <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                          {slide.buttonText}
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
