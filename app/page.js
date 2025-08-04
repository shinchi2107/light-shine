import AppCarousel from "@/components/app/app-carousel";
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { banner_carousel } from "@/constants/banner";
import Image from "next/image";
import Link from "next/link";
import styles from "./ui/home.module.css";
import HeaderHome from "@/components/layout/home/header-home";
import FooterHome from "@/components/layout/home/footer-home";
import ContainerWrapper from "@/components/common/container-wrapper";
import WelcomeBanner from "@/components/banner/welcome-banner";
import TextBanner from "@/components/banner/text-banner";
import ImageWithTextBanner from "@/components/banner/image-with-text-banner";
import HomeSpecialMenu from "@/components/pages/home/home-special-menu";
import StairScrollCount from "@/components/count/stair-scroll-count";
import ProductRecommend from "@/components/product/product-recommend";
import VideoBanner from "@/components/video/video-banner";
import HomeBlogSpecial from "@/components/pages/home/home-blog-special";
export default function Home() {
  return (
    <>
      <HeaderHome />
      <AppCarousel className="relative">
        <CarouselContent>
          {banner_carousel.map((item) => (
            <CarouselItem key={item.id} className="relative">
              <div className="carousel-bg w-full xl:h-[800px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-black/60 before:opacity-40">
                <Image className="w-full h-full object-cover" src={item.image.src} alt={item.image.alt} width={900} height={600} />
              </div>
              <div className="carousel-content absolute top-[50%] left-[50%] translate-y-[-20%] translate-x-[-50%] text-center">
                <Link href={item.link_btn} className="shadow-[0_0_0_1px_#ffffff] text-white font-bold px-10 py-3 hover:shadow-[0_0_0_1px_var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-300 rounded-xs">{item.title_btn}</Link>
                <div className={`${styles.scroll_icon} mt-10 flex justify-center`}>
                  <Image className="w-[18px] h-[32px] object-contain" src="/icon/ic_scroll.webp" alt="scroll" width={20} height={20} />
                </div>
                <div className="text-white text-sm">Scroll down</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-[50%] left-0 translate-y-[-50%] translate-x-[50%] z-10 cursor-pointer" />
        <CarouselNext className="absolute top-[50%] right-0 translate-y-[-50%] translate-x-[-50%] z-10 cursor-pointer" />
      </AppCarousel>
      <WelcomeBanner
        image_first="/banner/welcome-banner-1.webp"
        image_second="/banner/welcome-banner-2.webp"
        content={
          <TextBanner
            className="text-white flex-grow text-center flex flex-col justify-center items-center"
            is_icon={true}
            sub_title="Welcome to RoStay"
            title="Serving Amazing Meals Since 2008"
            description="Welcome to our sophisticated restaurant in the heart of Venice Enjoy stunning views of the beautiful city's historic architecture with a glass of fine wine and delicate salami prepared by the world's best chef"
            button_text="Make a Reservation"
            button_link="/" />
        }
        />
        <ImageWithTextBanner
          type="primary"
          content={
            <TextBanner
              className="text-white flex-grow text-center flex flex-col justify-center items-center bg-[#171f1f] px-10 xl:px-20 py-[30px] xl:py-0 h-full"
              is_icon={false}
              sub_title="UNIQUELY rostay"
              title="Michelin lunch, dinner or both?"
              description="It’s the story of an everlasting love affair, Dieter Rostay and the Atlantic Ocean. Our proximity to the abundant riches of the sea and Portugal’s excellent produce has provided a constant source of inspiration for Chef Rostay, ever since he set foot in our kitchen 30 years ago."
              button_text="Discover Menu"
              button_link="/" />
          }
          image="/banner/brunch-table-setting-with-different-delicious-food-beverages-ready-friends-home-party.webp" />
        <ImageWithTextBanner
          type="secondary"
          className="relative mb-20"
          content={
            <TextBanner
              className="text-white flex-grow text-center flex flex-col justify-center items-center px-10 xl:px-20 h-full py-[30px] xl:py-0"
              is_icon={false} 
              sub_title="30 YEARS OF INSPIRATION"
              title="Chef Dieter Rostay"
              description="Everyday Chef Delicioz sets himself the challenge to start from scratch – his tools: ingenuity, curiosity, enthusiasm, unparalleled talent and the highest craftsmanship."
              button_text="Meet our team"
              button_link="/" />
          }
          image="/banner/chef-cooking.webp" 
          image_decoration="/banner/image-decoration-banner.avif"
          />
      <HomeSpecialMenu title="Our special menu" />
      <div className="px-[30px]">
        <StairScrollCount className="mb-20" />
      </div>
      <ProductRecommend />
      <VideoBanner
        className="video-banner mb-20 px-8"
        thumbnail="/banner/table-with-table-set-two-with-tablecloth-flower-arrangement-it.webp" 
        title="Video Rostay" 
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
      />
      <HomeBlogSpecial />
      <FooterHome />
    </>
  );
}
