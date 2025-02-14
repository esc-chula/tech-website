type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      {...props}
      className="placeholder:text-white/50 w-full outline-none bg-white/20 backdrop-blur-sm border-2 border-white/10 rounded-xl h-10 p-2 focus:ring-2 focus:ring-white/75 focus:ring-opacity-50"
    />
  );
};

export default Input;
