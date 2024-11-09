export const MemberButton = ({ nameTag }: { nameTag: string }) => {
  return (
    <div className="flex h-14 items-center justify-start gap-4 rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-4">
      <div className="h-10 w-10 rounded-full bg-white"></div>
      <p>{nameTag}</p>
    </div>
  );
};
