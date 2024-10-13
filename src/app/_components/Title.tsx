export const Title = (props: {
  titleText: string;
  varience: "white" | "yellow";
}) => {
  const color = props.varience === "white" ? "white" : "#FCD34D";
  return (
    <p className="text-3xl font-semibold" style={{ color: color }}>
      {props.titleText}
    </p>
  );
};
