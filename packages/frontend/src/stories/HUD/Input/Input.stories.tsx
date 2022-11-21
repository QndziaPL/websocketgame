import { Input } from "./Input";
import { ComponentMeta } from "@storybook/react";
import { useRef, useState } from "react";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const Primary = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  return <Input ref={ref} value={value} onChange={setValue} name="input" />;
};
