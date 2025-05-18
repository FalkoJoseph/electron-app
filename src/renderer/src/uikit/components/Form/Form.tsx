interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Form = ({ children, ...props }: FormProps) => {
  return (
    <div className="flex flex-col gap-6" {...props}>
      {children}
    </div>
  );
};

export { Form };
