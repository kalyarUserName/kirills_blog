import { FC, InputHTMLAttributes } from "react";

import "./formInput.styles.scss";

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className={"input-container"}>
      <label>{label}</label>
      <input {...otherProps} />
    </div>
  );
};

export default FormInput;
