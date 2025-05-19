import { cn } from "@/uikit";

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  isLabel?: boolean;
  isValue?: boolean;
  label?: string;
  value?: string;
  width?: string;
}

const FormItem = ({
  children,
  isLabel,
  isValue,
  label,
  value,
  width,
  ...props
}: FormItemProps) => {
  return (
    <div
      className={cn(
        isLabel && `text-right ${!width ? "w-50" : width}`,
        isValue && `${!width ? "w-80" : width}`,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { FormItem };
