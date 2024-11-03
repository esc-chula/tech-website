import Image from "next/image"

interface AdsTextProps {
    image: string;
    title: string;
    subTitle: string;
}
export default function AdsText({
    image, 
    title, 
    subTitle,
}: AdsTextProps) {
    return (
        <div className="relative top-6 w-11/13 aspect-[2] overflow-hidden">
            <Image 
                src={image}
                alt={title}
                width={1000}
                height={800}
                className="absolute z-0 w-fit h-fit top-[1/2] left-[1/2]" />
            <div className="absolute bottom-0 z-10 w-full h-1/3 bg-gradient-to-t  from-black to-transparent" />
            <div className="absolute flex-col bottom-4 z-20 w-fit h-fit text-white text-left font-ibm-plex-sans-thai px-4">
                <div className="text-base font-semibold">{title}</div>
                <div className="text-xs font-light">{subTitle}</div>
            </div>
            
        </div>
    );
}