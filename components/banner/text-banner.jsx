import Link from "next/link";
import ListFanIcon from "../icon/ListFanIcon";
import ArrowRightIcon from "../icon/ArrowRightIcon";

const TextBanner = ({is_icon, sub_title, title, description, button_text, button_link, className = ''}) => {
    return (
        <div className={`text-banner ${className}`}>
        {sub_title && (
            <div className="text-banner__sub-title text-uppercase text-[13px] tracking-[3px] font-bold text-[var(--color-primary)] uppercase mb-4">
                {sub_title}
            </div>
        )}
        {title && (
            <div className="text-banner__title text-[32px] xl:text-[54px] uppercase font-[shippori_mincho] leading-[32px] xl:leading-[54px] mb-8">
                {title}
            </div>
        )}
        {is_icon && (
            <div className="text-banner__icon mb-8">
                <ListFanIcon width={100} height={36} />
            </div>
        )}
        {description && (
            <div className="text-banner__description text-[16px] tracking-[0.3px] leading-[22px] mb-8">
                {description}
            </div>
        )}
        {button_text && (
            <div className="text-banner__button group cursor-pointer uppercase text-[12px] tracking-[3px] font-[600] rounded-full bg-transparent border border-white text-white px-8 py-5 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300">
                <Link className="flex items-center gap-x-2" href={button_link}>
                {button_text} 
                <div className="group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRightIcon width={16} height={16} />
                </div>
                </Link>
            </div>
        )}
    </div>
    )
}

export default TextBanner;