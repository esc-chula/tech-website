import { BrowseNow } from "@/components/common/BrowseNow";
import { Session } from "@/components/common/Session";
import { Title } from "@/components/common/Title";
import { ViewRepo } from "@/components/common/ViewRepo";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const ProjectsSession = () => {
  return (
    <Session className="bg-black">
      <Title titleText="Our Projects" fontSize="48" varience="yellow" />

      <div className="flex w-full flex-col-reverse sm:w-[70%] sm:flex-row">
        <div className="mt-4 flex flex-col items-center justify-center space-y-2 sm:w-[50%]">
          <p className="text-3xl font-semibold text-center">Orientation Website 67</p>
          <p className="w-[70%] text-center text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <BrowseNow link="/" />
          <ViewRepo link="/" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 sm:w-[50%]">
          <div className="flex h-[270px] w-[90%] items-center justify-center bg-red-300">
            IMAGE
          </div>

          <div className="flex w-[90%] flex-row items-center justify-between">
            <div className="item-center flex cursor-pointer flex-row justify-center space-x-1 transition-all hover:-translate-y-1">
              <ArrowLeft />
              <p className="flex items-center text-sm">Previous</p>
            </div>
            <p className="text-sm text-[#FCD34D]">View All Project</p>
            <div className="item-center flex cursor-pointer flex-row justify-center space-x-1 transition-all hover:-translate-y-1">
              <p className="flex items-center text-sm">Next</p>
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </Session>
  );
};