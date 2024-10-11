export default function Background(): JSX.Element {
  const generateRandomCharacters = (length: number) => {
    const characters = "@!4%^23#&()[]{}$*l";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };

  const randomStrings = Array.from({ length: 50 }, () =>
    generateRandomCharacters(200),
  );

  return (
    <div className="font-tiny5 fixed bottom-0 left-0 right-0 top-0 -z-10 select-none whitespace-nowrap text-2xl leading-none opacity-[3%]">
      {randomStrings.map((str, index) => (
        <p key={index}>{str}</p>
      ))}
    </div>
  );
}
