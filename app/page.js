"use client";
import AppCarousel from "@/components/app/app-carousel";
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { banner_carousel } from "@/constants/banner";
import Image from "next/image";
import Link from "next/link";
import styles from "./ui/home.module.css";
import ProductPopular from "@/components/product/product-popular";

export default function Home() {
  return (
    <>
      <AppCarousel className="relative">
        <CarouselContent>
          {banner_carousel.map((item) => (
            <CarouselItem key={item.id} className="relative">
              <div className="carousel-bg w-full xl:h-[800px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-black/40 before:opacity-20">
                <Image className="w-full h-full object-cover" src={item.image.src} alt={item.image.alt} width={900} height={600} />
              </div>
              <div className="carousel-content absolute top-[50%] left-[50%] translate-y-[-20%] translate-x-[-50%] text-center">
                <Link href={item.link_btn} className="shadow-[0_0_0_1px_#ffffff] text-white font-bold px-10 py-3 hover:shadow-[0_0_0_1px_#d3b673] hover:bg-[#d3b673] transition-all duration-300 rounded-xs">{item.title_btn}</Link>
                <div className={`${styles.scroll_icon} mt-10 flex justify-center`}>
                  <Image className="w-[18px] h-[32px] object-contain" src="/icon/ic_scroll.webp" alt="scroll" width={20} height={20} />
                </div>
                <div className="text-white text-sm">Cuộn xuống</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-[50%] left-0 translate-y-[-50%] translate-x-[50%] z-10 cursor-pointer" />
        <CarouselNext className="absolute top-[50%] right-0 translate-y-[-50%] translate-x-[-50%] z-10 cursor-pointer" />
      </AppCarousel>

      <ProductPopular />
    </>
  );
}
