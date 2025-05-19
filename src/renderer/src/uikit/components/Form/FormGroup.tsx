interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
}

const FormGroup = ({ children, label, subLabel, ...props }: FormGroupProps) => {
  return (
    <div
      className="flex flex-col gap-3 group-[.has-divider]:pb-6 group-[.has-divider]:last:pb-0 group-[.has-divider]:last:border-b-0 group-[.has-divider]:border-b group-[.has-divider]:border-black/10 dark:group-[.has-divider]:border-white/10"
      {...props}
    >
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
