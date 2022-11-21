import { InputWithLabel } from "./InputWithLabel";
import { ComponentMeta } from "@storybook/react";
import { useRef, useState } from "react";

export default {
  title: "InputWithLabel",
  component: InputWithLabel,
} as ComponentMeta<typeof InputWithLabel>;

export const Primary = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  return (
    <InputWithLabel
      value={value}
      name="inputWithLabelName"
      onChange={setValue}
      ref={ref}
    />
  );
};
