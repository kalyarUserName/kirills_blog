import { FC, ButtonHTMLAttributes, MouseEventHandler } from "react";

import "./button.styles.scss";

export type ButtonProps = {
  text: string;
  isLoading?: boolean;
  onClick?: (event: MouseEventHandler<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  isLoading,
  ...otherProps
}) => {
  return (
    <button className={`custom-button`} onClick={onClick} {...otherProps}>
      {isLoading ? <div className={"spinner"} /> : text}
    </button>
  );
};

export default Button;
