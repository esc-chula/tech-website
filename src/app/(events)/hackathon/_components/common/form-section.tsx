interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="max-w-screen-sm w-full bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-2xl p-4 flex flex-col gap-2">
      <h2 className="text-center text-2xl font-ndot47 select-none">{title}</h2>
      {children}
    </div>
  );
};

export default FormSection;
