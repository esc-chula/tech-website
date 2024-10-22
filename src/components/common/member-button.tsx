export const MemberButton = ({ nameTag }: { nameTag: string }) => {
  return (
    <div className="flex h-14 w-56 items-center justify-start rounded-lg bg-gradient-to-b from-[#404040] to-[#262626] p-2">
      <div className="ml-3 mr-5 h-9 w-9 rounded-full bg-white"></div>
      <p>{nameTag}</p>
    </div>
  );
};
