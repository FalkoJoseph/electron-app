interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
}

const FormGroup = ({ children, label, subLabel, ...props }: FormGroupProps) => {
  return (
    <div className="flex flex-col gap-3" {...props}>
      {(label || subLabel) && (
        <div className="flex flex-col gap-1 mb-2">
          {label &&
            (typeof label === "string" ? (
              <p className="font-semibold">{label}</p>
            ) : (
              label
            ))}
          {subLabel &&
            (typeof subLabel === "string" ? (
              <p className="text-xs opacity-55">{subLabel}</p>
            ) : (
              subLabel
            ))}
        </div>
      )}
      {children}
    </div>
  );
};

export { FormGroup };
