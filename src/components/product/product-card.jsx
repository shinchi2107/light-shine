import Image from "next/image";
import Link from "next/link";

const { convertCurrencyFixed } = require("@/src/helpers/currency")

const ProductCard = ({ item }) => {
    return (
        <div className="product-card group">
            <Link href="/product/product-detail">
                <div className="product-card__image relative h-[400px] md:h-[530px] w-full rounded-t-full overflow-hidden mb-5">
                    <div className="product-card__image-first absolute top-0 left-0 w-full h-full">
                        <Image className="w-full h-full object-cover" src={item?.image_first} alt="product" width={272} height={325} />
                    </div>
                    {
                        item?.image_second && (
                            <div className="product-card__image-second absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Image className=" w-full h-full object-cover" src={item.image_second} alt="product" width={272} height={325} />
                            </div>
                        )
                    }
                </div>
            </Link>
            <div className="product-card__content mb-5 flex flex-col">
                <div className="product-card-meta flex gap-x-1 justify-center text-[12px] tracking-[1px] font-[600] text-[var(--color-primary)] uppercase">
                    <Link href="#" className="product-card-meta__tag">{item?.tags[0]}</Link>
                    {
                        item?.tags[1] && (
                            <>
                                /
                                <Link href="#" className="product-card-meta__tag">{item?.tags[1]}</Link>
                            </>
                        )
                    }
                </div>
                <div className="product-card__title mb-3">
                    <Link href="/product/product-detail" className="product-card__title-text text-white text-[20px] font-[500] uppercase text-ellipsis line-clamp-1">{item.title}</Link>
                </div>
                <div className="product-card__description mb-5 flex-grow">
                    <p className="product-card__description-text text-[16px] font-[400] leading-[24px] text-white">
                        {item.description}
                    </p>
                </div>
                <div className="product-card__price flex gap-x-2 justify-center">
                    {
                        item?.compare_price && item?.compare_price !== item?.price && (
                            <div className="product-card__price-compare text-[16px] font-[400] leading-[24px] text-[var(--color-primary)] line-through">{convertCurrencyFixed(item.compare_price, "USD", 1)}</div>
                        )
                    }
                    <div className={`product-card__price-current text-[16px] font-[600] leading-[24px] text-[var(--color-primary)] ${item?.compare_price && item?.compare_price !== item?.price ? "text-white" : ""}`}>{convertCurrencyFixed(item.price, "USD", 1)}</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
