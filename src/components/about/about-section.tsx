import { Section } from "@/components/common/section";
import { Title } from "@/components/common/title";

export const AboutSection = () => {
  return (
    <Section className="gap-4">
      <Title className="text-5xl">About</Title>
      <p className="text-center font-normal max-sm:text-sm sm:w-[40%] sm:font-semibold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="flex flex-col items-center justify-center font-normal sm:font-semibold">
        <p>P Poon</p>
        <p>Head of Tech ,ESC67 No 1</p>
      </div>
    </Section>
  );
};
