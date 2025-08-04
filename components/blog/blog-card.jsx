import Image from "next/image";
import Link from "next/link";

const BlogCard = ({item, index}) => {
    return (
        <Link href={item.url} className={`shadow-[0_1px_4px_rgba(0,0,0,0.16)] rounded-md p-5 group ${index === 0 ? 'col-span-2' : 'col-span-1'}`} key={item.id}>
            <div className={`blog-news-promo__item-image w-full ${index === 0 ? 'max-h-[400px]' : 'h-[160px] md:h-[90px] lg:h-[120px] xl:h-[160px]'} overflow-hidden rounded-md`}>
                <Image className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" src={item.image} alt="blog-news-promo" width={200} height={300} />
            </div>
            <div className="blog-news-promo__item-content flex flex-col gap-4 mt-5">
                <div className="blog-news-promo__item-title">
                    <h3 className="text-sm font-bold line-clamp-3 text-ellipsis">{item.title}</h3>
                </div>
                {item.description && (
                    <div className="blog-news-promo__item-description">
                        <p className="text-sm">
                            {item.description}
                        </p>
                    </div>
                )}
                {index == 0 && (
                    <div className="blog-news-promo__item-action">
                        <div className="w-fit text-[#ffff] border border-[#d3b673] bg-[#d3b673] px-10 py-3 hover:bg-white hover:border-[#d3b673] hover:text-[#d3b673] transition-all duration-300 rounded-sm">Xem thêm</div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default BlogCard;