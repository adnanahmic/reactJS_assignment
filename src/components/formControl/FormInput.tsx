import {
  RegisterOptions,
  UseFormRegister,
  Path,
  FieldValues,
  FieldErrors,
} from "react-hook-form";
import { Input, InputProps } from "../atoms/Input";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions | any;
  register?: UseFormRegister<TFormValues>;
  type: string;
  errors: FieldErrors<FieldValues>;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  type,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className} aria-live="polite">
      <Input
        name={name}
        type={type}
        {...props}
        {...(register && register(name, rules))}
      />
    </div>
  );
};
