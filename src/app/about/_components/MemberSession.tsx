import { Member } from "@/app/_components/Member";
import { Session } from "@/app/_components/Session";
import { Title } from "@/app/_components/Title";

export const MemberSession = () => {
  return (
    <Session>
      <Title titleText="Members" varience="yellow" />
      <p className="text-center max-sm:text-sm sm:w-[40%]">
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
