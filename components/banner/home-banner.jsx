import Image from "next/image";

const HomeBanner = ({children, image, className}) => {
    return (
        <div className={`home-banner ${className}`}>
            <Image className="w-full h-full object-cover hidden sm:block" src={image} width={1920} height={1080} alt="Home Banner" />
            {children}
        </div>
    )
}

export default HomeBanner;