import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "../icon/ArrowRightIcon";

const BlogSpecial = ({image, title, description, url, className = ""}) => {
    return (
        <div className={`blog-special text-center ${className}`}>
            <div className="blog-special__image w-full h-[541px] rounded-t-full mb-10 overflow-hidden">
                <Image className="w-full h-full object-cover" src={image} alt={title} width={630} height={541} />
            </div>
            <div className="blog-special__content text-white text-center px-8 mb-10">
                <h1 className="text-[40px] uppercase font-[shippori-mincho] tracking-[3px] mb-3">{title}</h1>
                <p className="text-[15px] leading-[30px]">{description}</p>
            </div>
            <Link href={url} className="blog-special__linkgroup uppercase font-[600] text-[13px] tracking-[1px]">
                <span className="relative pb-1 w-fit mx-auto flex items-center justify-center gap-x-2 text-[var(--color-primary)] before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:bg-[var(--color-primary)]">
                    Discover Now
                    <span className="group-hover:translate-x-1 transition-all duration-300">
                        <ArrowRightIcon fill="#f2b612" width={15} height={15} />
                    </span>
                </span>
            </Link>
        </div>
    )
}

export default BlogSpecial;