import { Member } from "@/components/common/Member";
import { Session } from "@/components/common/Session";
import { Title } from "@/components/common/Title";

export const MemberSession = () => {
  return (
    <Session>
      <Title titleText="Members" fontSize="48" varience="yellow" />
      <p className="text-center max-sm:text-sm font-normal sm:font-semibold sm:w-[40%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </p>
      <div className="flex w-[60%] flex-wrap items-center justify-center gap-2">
        {memberTemp.map((member, index) => (
          <Member key={index} nameTag={member} />
        ))}
      </div>
    </Session>
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
