interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div
      className='flex w-full max-w-screen-sm flex-col gap-2 rounded-2xl border-2 border-white/10 bg-white/5 p-4 backdrop-blur-md'
      id={title}
    >
      <h2 className='select-none text-center font-ndot47 text-2xl'>{title}</h2>
      <p className='text-center text-sm text-white/50'>{description}</p>
      {children}
    </div>
  )
}

export default FormSection
