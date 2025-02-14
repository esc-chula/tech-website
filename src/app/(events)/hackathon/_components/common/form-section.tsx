interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div
      className="max-w-screen-sm w-full bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-2xl p-4 flex flex-col gap-2"
      id={title}
    >
      <h2 className="text-center text-2xl font-ndot47 select-none">{title}</h2>
      <p className="text-center text-sm text-white/50">{description}</p>
      {children}
    </div>
  );
};

export default FormSection;
