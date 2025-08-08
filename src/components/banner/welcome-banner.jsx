import Image from "next/image";
import ContainerWrapper from "../common/container-wrapper";
const WelcomeBanner = ({
    image_first,
    image_second,
    content,
}) => {
    return (
        <ContainerWrapper>
            <div className="welcome-banner relative bg-[#0f1618] pt-[120px] pb-[90px] px-8 flex lg:flex-row flex-col justify-between items-center gap-[100px]">
                {image_first && (
                    <div className="max-w-[350px] xl:max-w-[350px] xl:h-[444px] flex-shrink-0">
                        <Image className="w-full h-full object-cover" src={image_first} alt="image-first" width={350} height={444} />
                    </div>
                )}
                {content}
                {image_second && (
                    <div className="max-w-[350px] xl:max-w-[350px] xl:h-[444px] flex-shrink-0">
                        <Image className="w-full h-full object-cover" src={image_second} alt="image-second" width={350} height={444} />
                    </div>
                )}
            </div>
        </ContainerWrapper>
    )
}

export default WelcomeBanner;