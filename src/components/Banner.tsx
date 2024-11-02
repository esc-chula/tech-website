import Image from "next/image";
import escBannerImage from "../images/esc_tech_website_banner_image_1.png";

const Banner = () => (
  <div id="top-banner" className="h-full w-full content-center justify-center">
    <div className="flex h-full flex-initial flex-row">
      <div className="h-auto basis-3/4 overflow-hidden" id="banner-section-tab">
        <div className="relative h-full w-full object-cover">
          <div className="absolute z-10 inline-block h-full w-full bg-gradient-to-t from-black to-transparent to-35%"></div>
          <div className="absolute z-20 flex h-full flex-col justify-end">
            <div className="flex h-1/6 items-end pl-5">
              <p className="align-bottom text-2xl font-semibold text-white">
                TECH website is now open!
              </p>
            </div>
            <div className="flex h-auto items-end pb-5 pl-5 pt-2">
              <p className="align-bottom text-xs text-white">
                A place of tools and knowledges for geeks.
              </p>
            </div>
          </div>
          <Image
            src={escBannerImage}
            alt="esc members picture on the wall in the shape of E S C characters"
            fill={true}
            className="h-full w-full object-cover"
          ></Image>
        </div>
      </div>
      <div
        className="relative flex h-full basis-1/4 flex-col bg-black object-cover"
        id="banner-menu-tab"
      >
        <div className="flex h-1/6 flex-col justify-center border-b border-[#272727] p-5 text-xl">
          <p className="font-semibold text-white">About</p>
        </div>
        <div className="flex h-1/6 flex-col justify-center border-b border-[#272727] p-5 text-xl">
          <p className="font-semibold text-white">Documentations</p>
        </div>
        <div className="flex h-1/6 flex-col justify-center border-b border-[#272727] p-5 text-xl">
          <p className="font-semibold text-white">Tools & Apps</p>
        </div>

        <div id="banner-profile" className="h-full w-full flex items-end">
          <div className="align-bottom h-min w-full flex flex-row">
            <div className="basis-1/4"></div>
            <div className="basis-2/4"></div>
            <div className="basis-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
