import { Dispatch, FC, RefObject, SetStateAction } from "react";
import { Input } from "../Input/Input";
import "./InputWithLabel.css";

export interface InputWithLabelProps {
  value: string;
  name: string;
  onChange: Dispatch<SetStateAction<string>>;
  ref: RefObject<HTMLInputElement>;
}

export const InputWithLabel: FC<InputWithLabelProps> = ({
  onChange,
  name,
  ref,
  value,
}) => {
  return (
    <div className="inputWithLabel">
      <label htmlFor="nickname">nickname</label>
      <Input ref={ref} name={name} value={value} onChange={onChange} />
    </div>
  );
};
