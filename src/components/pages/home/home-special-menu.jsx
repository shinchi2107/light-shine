import ContainerWrapper from "@/src/components/common/container-wrapper";
import ArrowRightIcon from "@/src/components/icon/ArrowRightIcon";
import TabsWithImages from "@/src/components/tabs/tabs-with-images";
import { tabs_with_images } from "@/src/constants/tab";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";
const HomeSpecialMenu = ({title, className = ''}) => {
    return (
        <ContainerWrapper>
        <div className={cn(`home-special-menu relative mb-10 ${className}`)}>
            <div className="home-special-menu__header mb-15">
                <h1 className="text-center tracking-[3px] text-[13px] font-[600] text-[var(--color-primary)] uppercase mb-4">{title}</h1>
            </div>
            <div className="home-special-menu__image-decoration lg:block hidden absolute top-0 right-[20%] z-1">
                <Image src="/thumbnail/collapsible_img_small.webp" alt="special-menu-decoration" width={150} height={150} />
            </div>
            <TabsWithImages className="mb-10" tabs={tabs_with_images} />
            <div className="text-banner__button w-fit mx-auto group cursor-pointer uppercase text-[12px] tracking-[3px] font-[600] rounded-full bg-transparent border border-white text-white px-8 py-5 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300">
                <Link className="flex items-center gap-x-2" href="/">
                    View All Menu
                <div className="group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRightIcon width={16} height={16} />
                </div>
                </Link>
            </div>
        </div>
        </ContainerWrapper>
    )
}

export default HomeSpecialMenu;