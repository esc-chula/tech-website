type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      {...props}
      className='h-10 w-full rounded-xl border-2 border-white/10 bg-white/20 p-2 text-sm outline-none backdrop-blur-sm placeholder:text-sm placeholder:text-white/50 focus:ring-2 focus:ring-white/75 focus:ring-opacity-50'
    />
  )
}

export default Input
