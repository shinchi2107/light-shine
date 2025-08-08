import ContainerWrapper from "@/src/components/common/container-wrapper";
import Image from "next/image";
import FooterMenu from "./footer-menu-item";
import { home_footer_menus } from "@/src/constants/menu";
import Link from "next/link";

const FooterHome = () => {
    return (
        <div className="footer-wrapper relative h-full before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:bg-black/40">
            <div className="absolute top-0 left-0 w-full h-full z-[-2]">
                <Image className="w-full h-full object-cover" src="/banner/footer-bg-1.webp" alt="bg-footer" width={1100} height={600} />
            </div>
            <ContainerWrapper>
                <div className="footer-content pt-[55px] px-5 lg:px-0">
                    <div className="footer-content__menu flex flex-row flex-wrap justify-center gap-[30px] font-baloo_2">
                        {home_footer_menus.map((item, index) => (
                            <FooterMenu className="flex flex-col gap-y-[20px] md:max-w-[300px] lg:max-w-[456px]" key={index}>
                                <div className="footer-title text-[#d3b673] text-lg font-bold uppercase">
                                    {item.title}
                                </div>
                                <FooterMenu.List className="flex flex-col gap-y-[10px]">
                                    {item.sub_menu.map((sub_item, sub_index) => (
                                        <FooterMenu.Item className="text-white font-medium text-sm flex items-center gap-x-[10px]" key={sub_index}>
                                            {sub_item.icon && (
                                                <div className="flex items-center gap-x-[10px]">
                                                    <sub_item.icon className="w-[16px] h-[16px] text-[#d3b673]" />
                                                </div>
                                            )}
                                            {sub_item.href ? (
                                                <Link href={sub_item.href}>
                                                    {sub_item.title}
                                                </Link>
                                            ) : (
                                                <span>
                                                    {sub_item.title}
                                                </span>
                                            )}
                                        </FooterMenu.Item>
                                    ))}
                                </FooterMenu.List>
                                <FooterMenu.List className="flex gap-x-[30px]">
                                    {item.social_medias && item.social_medias.map((social_media, social_index) => (
                                        <FooterMenu.Item className="text-white font-medium text-sm flex items-center gap-x-[10px]" key={social_index}>
                                            <social_media.icon className="w-[20px] h-[20px] text-[#d3b673]" />
                                        </FooterMenu.Item>
                                    ))}
                                </FooterMenu.List>
                            </FooterMenu>
                        ))}
                    </div>
                    <div className="footer-bottom mt-[30px] border-t border-white py-[30px]">
                        <div className="footer-bottom__wrapper flex justify-between text-white text-md font-medium font-baloo_2">
                            <span>
                                Rostay - A pioneering food brand using Vietnamese agricultural produce.
                            </span>
                            <span>
                                Copyrights © 2025 by Rostay. All rights reserved
                            </span>
                        </div>
                    </div>
                </div>
            </ContainerWrapper>
        </div>
    )
}
export default FooterHome;