import { formatDate } from "@/src/helpers/date";
import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "../icon/ArrowRightIcon";

const BlogCard = ({ item, className = "" }) => {
    return (
        <div className={`blog-card__wrapper group ${className}`}>
            <Link href={item.url} className="blog-card__image block mb-5 overflow-hidden">
                <Image className="w-full h-full object-cover group-hover:scale-105 transition-all duration-400" src={item.image} alt={item.title} width={450} height={260} />
            </Link>
            <div className="blog-card__content text-[#bebebe] font-[500] text-center p-[0_20px_20px_20px]">
                <div className="blog-card__meta text-[12px] mb-3 flex justify-center uppercase font-[600]">
                    <div className="blog-card__meta__date pr-6 relative before:content-[''] before:absolute before:top-[50%] before:right-0 before:w-[3px] before:h-[3px] before:bg-[#bebebe] before:mr-3 before:translate-y-[-50%] before:translate-x-[50%] before:rounded-full">
                        <p>{formatDate(item.date,"MMM dd, yyyy")}</p>
                    </div>
                    <div className="blog-card__meta__comments">
                        <p>{item.comments} comments</p>
                    </div>
                </div>
                <Link href={item.url} className="blog-card__title text-[#fff] text-[20px] uppercase line-clamp-2 text-ellipsis mb-5 hover:text-[var(--color-primary)] transition-all duration-400">
                    <h3>{item.title}</h3>
                </Link>
                <div className="blog-card__description line-clamp-3 text-ellipsis text-[16px] mb-7">
                    <p>{item.description}</p>
                </div>
                <div className="blog-card__action">
                    <Link href={item.url} className="group/action-read-more blog-card__action__read-more flex items-center justify-center gap-x-2 w-fit mx-auto uppercase text-[12px] tracking-[2px] text-white pb-2 border-b border-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-400">
                        Read more
                        <ArrowRightIcon  className="w-4 h-4 group-hover/action-read-more:translate-x-1 transition-all duration-400"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;