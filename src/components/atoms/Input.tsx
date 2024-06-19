import React, {
  FC,
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  Fragment,
} from "react";
import classNames from "classnames";
import { FieldErrors, FieldValues } from "react-hook-form";

export type InputSize = "medium" | "large";
export type InputType = "text" | "email" | "date" | "password";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  errors?: FieldErrors<FieldValues> | any;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

const sizeMap: { [key in InputSize]: string } = {
  medium: "p-3 text-base",
  large: "p-4 text-base",
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      size = "medium",
      className = "",
      placeholder,
      errors,
      ...props
    },
    ref
  ) => {
    return (
      <Fragment>
        <div className="w-full flex flex-col relative z-0 rounded form-group">
          <label
            htmlFor={`floating_${id}`}
            className="bottom-[10px] peer-focus:top-[11px] peer z-20 input_label transform scale-75  origin-[0] peer-focus:left-[15px] rtl:peer-focus:translate-x-1/4"
          >
            {label}
          </label>
          <input
            id={`floating_${id}`}
            ref={ref}
            name={name}
            type={type}
            aria-label={label}
            className={classNames([
              "w-full h-full rounded leading-none transition-colors ease-in-out border peer input p-0",
              className,
            ])}
            {...props}
          />
        </div>
        {errors?.[name] && (
          <p className=" text-red-500 text-xs italic pt-2">
            {errors?.[name]?.message}
          </p>
        )}
      </Fragment>
    );
  }
);
