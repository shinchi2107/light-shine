import Image from "next/image";

const HeaderBanner = ({ title = 'ToCoToCo Menu', description = 'Sản phẩm nổi bật', image = '/banner/home_line.webp', className = '' }) => {
    return (
        <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
            <div className="text-2xl font-bold text-[#d3b673]">{title}</div>
            <div className="text-4xl font-bold text-black font-baloo_2">{description}</div>
            <div className="product-popular__banner w-[315px] h-[30px]">
                <Image className="w-full h-full object-cover" src={image} alt={`product-${title}`} width={100} height={100} />
            </div>
        </div>
    )
}

export default HeaderBanner;