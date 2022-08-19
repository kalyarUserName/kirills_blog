import { FC, ButtonHTMLAttributes } from "react";

import "./button.styles.scss";

export type ButtonProps = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ text, ...otherProps }) => {
  return (
    <button className="custom-button" {...otherProps}>
      {text}
    </button>
  );
};

export default Button;
