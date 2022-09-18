import React from "react";

export const AuthFormInput: React.ForwardRefExoticComponent<
  {
    inputName: string;
    inputType: string;
  } & React.RefAttributes<HTMLInputElement>
> = React.forwardRef(({ inputName, inputType }, forwardedRef) => (
  <div className="my-4 flex flex-col text-center">
    <label className="basis-1/4 w-full" htmlFor={inputName}>
      {inputName}
    </label>
    <input
      ref={forwardedRef}
      className="basis-1/2 w-3/4 mx-auto px-2 py-1 rounded-md bg-gray-100 focus:border-black text-black focus-within:text-black"
      type={inputType}
      id={inputName}
    />
  </div>
));
