import { FC, RefObject } from "react";

export interface InputProps {
  ref: RefObject<HTMLInputElement>;
  value: string;
  name: string;
  onChange: (value: string) => void;
}

export const Input: FC<InputProps> = ({ ref, name, onChange, value }) => {
  return (
    <input
      ref={ref}
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
