export const Title = (props: {
  titleText: string;
  fontSize: "64" | "48";
  varience: "white" | "yellow";
}) => {
  const color = props.varience === "white" ? "white" : "#FCD34D";
  const size = props.fontSize === "64" ? "sm:text-[64px]" : "sm:text-[48px]";
  const smallSize = props.fontSize === "64" ? "text-[24px]" : "text-[20px]";
  return (
    <p
      className={`font-semibold sm:font-bold ${smallSize} ${size}`}
      style={{ color: color }}
    >
      {props.titleText}
    </p>
  );
};
