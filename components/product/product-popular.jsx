import { product_populars } from "@/constants/product";
import ContainerWrapper from "../common/container-wrapper";
import Image from "next/image";
import { convertCurrencyFixed } from "@/helpers/currency";
import Link from "next/link";
const ProductPopular = () => {
    return <ContainerWrapper className="mt-10 px-2 md:px-0">
        <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-[#d3b673]">ToCoToCo Menu</div>
            <div className="text-4xl font-bold text-black font-baloo_2">Sản phẩm nổi bật</div>
            <div className="product-popular__banner w-[315px] h-[30px]">
                <Image className="w-full h-full object-cover" src="/banner/home_line.webp" alt="product-popular-banner" width={100} height={100} />
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 mb-5">
            {product_populars.map((item) => (
                <Link href={`/product/${item.id}`} className="product-card group" key={item.id}>
                    <div className="product-card__image md:h-[250px] lg:h-[300px] overflow-hidden relative">
                        <Image className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" src={item.image} alt="product-popular-banner" width={800} height={600} />
                        <div className="product-card__action absolute bottom-0 left-0 w-full bg-black rounded-t-md  flex items-center justify-center translate-y-[100%] group-hover:translate-y-[0%] transition-all duration-300 hover:bg-[#d3b673]">
                           <div class="product-atc text-white font-bold text-sm py-2">
                                Đặt hàng
                           </div>
                        </div>
                    </div>
                    <div className="product-card__content flex flex-col items-center gap-3 mt-3">
                        <div className="product-card__name text-md font-bold text-ellipsis line-clamp-1">
                            <h3>{item.name}</h3>
                        </div>
                        <div className="product-card__price flex gap-2 text-sm">
                            <span className="product-card__price-current font-bold text-[#8a733f]">{convertCurrencyFixed(item.price, 'VND', 1)}</span>
                            <span className="product-card__price-compare font-semibold text-gray-500 opacity-50 line-through">{convertCurrencyFixed(item.compare_price, 'VND', 1)}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        <div className="product-popular__button text-center my-14">
            <Link href="/products" className="product-popular__button-link px-8 py-4 hover:bg-[#d3b673] border border-[#d3b673] text-[#d3b673] hover:text-white font-bold rounded-sm transition-all duration-300">Xem tất cả</Link>
        </div>
    </ContainerWrapper>;
};

export default ProductPopular;
