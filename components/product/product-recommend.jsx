import Link from "next/link";
import AppCarousel from "../app/app-carousel";
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import ProductCard from "./product-card";
import { product_recommends } from "@/constants/product";

const ProductRecommend = () => {
    return (
        <div className="product-recommend text-center mb-20">
            <h1 className="subtitle text-[13px] tracking-[3px] font-[600] text-[var(--color-primary)] uppercase">Recommendations</h1>
            <h2 className="title text-[54px] uppercase text-white font-[400] font-[shippori_mincho]">Best Specialties</h2>
            <div className="product-recommend__container mt-15">
                <AppCarousel opts={{
                    loop: true,
                    align: "start"
                }}>
                    <CarouselContent className="gap-x-3 pr-10 pl-5">
                        {product_recommends.map((item, index) => (
                            <CarouselItem key={index} className="sm:basis-1/2 xl:basis-1/3">
                                <ProductCard item={item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden absolute top-[50%] left-0 translate-y-[-50%] translate-x-[50%] z-10 cursor-pointer" />
                    <CarouselNext className="hidden absolute top-[50%] right-0 translate-y-[-50%] translate-x-[-50%] z-10 cursor-pointer" />
                </AppCarousel>
            </div>
        </div>
    )
}

export default ProductRecommend;