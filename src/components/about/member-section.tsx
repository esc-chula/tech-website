import { MemberButton } from "@/components/common/member-button";
import { Section } from "@/components/common/section";
import { Title } from "@/components/common/title";

export const MemberSection = () => {
  return (
    <Section>
      <Title titleText="Members" fontSize="48" varience="yellow" />
      <p className="text-center font-normal max-sm:text-sm sm:w-[40%] sm:font-semibold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </p>
      <div className="flex w-[60%] flex-wrap items-center justify-center gap-2">
        {memberTemp.map((member, index) => (
          <MemberButton key={index} nameTag={member} />
        ))}
      </div>
    </Section>
  );
};

const memberTemp = [
  "Jowkem #2 CEDT",
  "GG #2 CP",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
];
