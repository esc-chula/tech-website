import { Session } from "@/components/common/Section";
import { Title } from "@/components/common/Title";

export const AboutSession = () => {
  return (
    <Session>
      <Title titleText="ABOUT" fontSize="64" varience="white" />
      <p className="text-center max-sm:text-sm font-normal sm:font-semibold sm:w-[40%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="flex flex-col items-center font-normal sm:font-semibold justify-center">
        <p>P Poon</p>
        <p>Head of Tech ,ESC67 No 1</p>
      </div>
    </Session>
  );
};
