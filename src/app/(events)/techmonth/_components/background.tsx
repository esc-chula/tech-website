const Background: React.FC = () => {
  const generateRandomCharacters = (length: number): string => {
    const characters = '@!4%^23#&()[]{}$*l';
    let result = '';
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
    <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 select-none whitespace-nowrap font-tiny5 text-2xl leading-none opacity-[3%]">
      {randomStrings.map((str) => (
        <p key={str}>{str}</p>
      ))}
    </div>
  );
};

export default Background;
