import Image from "next/image";

const ImageWithTextBanner = ({type, content, image, className = '', image_decoration = ''}) => {
    return (
        <div className={`image-with-text-banner flex flex-col md:flex-row ${type === 'secondary' ? 'md:flex-row-reverse' : ''} ${className}`}>
            <div className="image-with-text-banner__image w-full md:w-1/2 flex-1">
                <Image className="w-full h-full object-cover" src={image} alt="image" width={500} height={500} />
            </div>
            <div className="image-with-text-banner__content w-full md:w-1/2 flex-1">
                {content}
            </div>
            {image_decoration && (
                <div className="xl:block hidden image-with-text-banner__image-decoration absolute bottom-[-100px] left-0 z-1 w-[309px] h-[306px]">
                    <Image className="pt-full" src={image_decoration} alt="image" width={309} height={306} />
                </div>
            )}
        </div>
    )
}

export default ImageWithTextBanner;