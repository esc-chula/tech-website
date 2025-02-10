const PrizeSection: React.FC = () => {
  return (
    <>
      {/* <p className="text-5xl sm:text-6xl md:text-8xl font-ndot47">
        1,<span className="text-hackathon-primary">111</span>,111
      </p> */}
      <p className="text-5xl sm:text-6xl md:text-8xl font-ndot47 select-none">
        ?<span className="text-hackathon-primary">?</span>???
      </p>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">Prize Pool</p>
      <p className="text-xs -mt-3 sm:-mt-4 md:-mt-6 text-white/50">(baht)</p>
      <div className="-z-10 rounded-full absolute w-[400px] sm:w-[600px] md:w-[800px] aspect-square bg-hackathon-radial-gradient" />
    </>
  );
};

export default PrizeSection;
