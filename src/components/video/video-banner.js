import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { renderPlayer } from "@/src/helpers/video";
const VideoBanner = ({ thumbnail, title, url, className = "" }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={`relative w-full group ${thumbnail ? '' : 'bg-gray-200'} ${className}`}>
                    <div className={`relative h-[400px] md:h-[600px] lg:h-[800px] cursor-pointer overflow-hidden`}>
                        <Image
                            src={thumbnail || '/banner/image_default.webp'}
                            alt={title}
                            width={1412}
                            height={820}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition hover:brightness-110">
                            <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] border-2 border-white border-b-gray-500 animate-spin animation-duration-5000 rounded-full flex items-center justify-center">
                                <svg viewBox="0 0 24 24" width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z" stroke="#ffffff" strokeWidth="1.5"></path> </g></svg>
                            </div>
                        </div>
                    </div>
                    {title && <div className="px-8 text-sm text-white text-[25px] break-all sm:break-normal sm:text-[40px] md:text-[70px] lg:text-[100px] 2xl:text-[190px] font-[shippori_mincho] uppercase tracking-[20px] absolute top-0 left-0 w-full text-center mt-[40px] opacity-[0.46]">{title}</div>}
                </button>
            </DialogTrigger>
            <DialogContent
                className="w-full h-full flex flex-col items-center justify-center bg-[#0e1618]"
                classNameCloseButton="text-white cursor-pointer"
            >
                <DialogTitle>{""}</DialogTitle>
                {renderPlayer(url, title)}
            </DialogContent>
        </Dialog>
    )
}

export default VideoBanner;