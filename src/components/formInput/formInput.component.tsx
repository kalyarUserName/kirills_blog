import { FC, InputHTMLAttributes, useState } from "react";

import "./formInput.styles.scss";

import Eye from "../eye/eye.component";

export type FormInputProps = {
  label: string;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, error, ...otherProps }) => {
  const [inputType, setInputType] = useState(otherProps.type);

  const eyeClick = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };
  return (
    <div className={"input-container"}>
      <label>{label}</label>
      <div
        className={`inputBox ${inputType === "file" && "file"} ${
          error && "error"
        }`}
      >
        <input {...otherProps} type={inputType} />
        {otherProps.type === "password" && (
          <Eye isOpen={inputType === "text"} onClick={eyeClick} />
        )}
      </div>
    </div>
  );
};

export default FormInput;
