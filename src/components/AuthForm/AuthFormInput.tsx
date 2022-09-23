import React from "react";

const wrapperDivStyles = "my-4 flex flex-col text-center";
const labelStyles = "basis-1/4 w-full";
const inputStyles =
  "basis-1/2 w-3/4 mx-auto px-2 py-1 rounded-md bg-gray-100 focus:border-black text-black focus-within:text-black";

type AuthFormInputFCRefType = React.ForwardRefExoticComponent<
  {
    inputName: string;
    inputType: string;
  } & React.RefAttributes<HTMLInputElement>
>;

export const AuthFormInput: AuthFormInputFCRefType = React.forwardRef(
  ({ inputName, inputType }, forwardedRef) => (
    <div className={wrapperDivStyles}>
      <label className={labelStyles} htmlFor={inputName}>
        {inputName}
      </label>
      <input
        ref={forwardedRef}
        className={inputStyles}
        type={inputType}
        id={inputName}
      />
    </div>
  )
);
