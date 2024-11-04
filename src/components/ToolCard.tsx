import Image from "next/image";
import QRCodeIcon from "../images/QRCodeIcon.png";

const ToolCard = () => (
  <div className="50 aspect-square w-1/4">
    <div className="relative flex h-2/3 flex-col items-center justify-center border-b-2 border-[#272727] bg-black/50">
      <div className="relative aspect-square w-2/5">
        <Image
          src={QRCodeIcon}
          alt="QR Code Icon"
          fill={true}
          className="object-cover"
        ></Image>
      </div>
    </div>
    <div className="h-1/3 bg-black p-4">
      <div className="h-2/3">
        <div className="h-min pb-1 text-xl font-semibold text-white">
          QR Code Generator
        </div>
        <div className="h-min align-top text-sm text-white">
          Create custom QR Code with styles!
        </div>
      </div>
      <div className="flex h-1/3 place-content-end text-white">
        <div className="h-full w-1/5 bg-amber-300 text-center text-sm text-black">
          Launch
        </div>
      </div>
    </div>
  </div>
);

export default ToolCard;
