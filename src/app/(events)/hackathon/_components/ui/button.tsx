import Link from 'next/link'

import { cn } from '~/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  href?: string
}

const Button: React.FC<ButtonProps> = ({ children, href, ...props }) => {
  const className =
    'flex items-center gap-2 select-none sm:gap-2.5 md:gap-3 bg-hackathon-primary rounded-full px-8 sm:px-9 md:px-10 py-3 sm:py-3.5 md:py-4 text-lg sm:text-xl md:text-2xl'

  if (href) {
    return (
      <Link className={cn(className, props.className)} href={href}>
        {children}
      </Link>
    )
  }

  return (
    <button {...props} className={cn(className, props.className)} type='button'>
      {children}
    </button>
  )
}

export default Button
