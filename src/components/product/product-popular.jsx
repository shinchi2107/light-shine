import { product_populars } from "@/src/constants/product";
import Image from "next/image";
import { convertCurrencyFixed } from "@/src/helpers/currency";
import Link from "next/link";
import HeaderBanner from "../banner/header-banner";
const ProductPopular = () => {
    return <>
        <HeaderBanner title="ToCoToCo Menu" description="Sản phẩm nổi bật" image="/banner/home_line.webp" className="mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 mb-5">
            {product_populars.map((item) => (
                <Link href={`/product/${item.id}`} className="product-card group" key={item.id}>
                    <div className="product-card__image max-h-[300px] overflow-hidden relative">
                        <Image className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" src={item.image} alt="product-popular-banner" width={800} height={600} />
                        <div className="product-card__action absolute bottom-0 left-0 w-full bg-black rounded-t-md  flex items-center justify-center translate-y-[100%] group-hover:translate-y-[0%] transition-all duration-300 hover:bg-[#d3b673]">
                           <div className="product-atc text-white font-bold text-sm py-2">
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
    </>;
};

export default ProductPopular;
