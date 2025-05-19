import { cn } from "@/uikit";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  hasDivider?: boolean;
}

const Form = ({ children, hasDivider, ...props }: FormProps) => {
  return (
    <div
      className={cn("group flex flex-col gap-6", hasDivider && "has-divider")}
      {...props}
    >
      {children}
    </div>
  );
};

export { Form };
