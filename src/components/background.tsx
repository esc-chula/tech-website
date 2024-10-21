export default function Background() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 -z-10">
      <div
        className="absolute z-20 h-full w-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.75) 125%)",
        }}
      />
      <div className="absolute z-10 h-full w-full bg-[url('/assets/background.svg')] bg-[length:180px_180px] bg-repeat"></div>
    </div>
  );
}
