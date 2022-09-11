import { FC } from "react";

export const AuthFormInput: FC<{ inputName: string; inputType: string }> = ({
  inputName,
  inputType,
}) => {
  return (
    <div className="my-4 flex flex-col text-center">
      <label className="basis-1/4 w-full" htmlFor={inputName}>
        {inputName}
      </label>
      <input
        className="basis-1/2 w-3/4 mx-auto px-2 py-1 rounded-md bg-gray-100 focus:border-black text-black focus-within:text-black"
        type={inputType}
        id={inputName}
      />
    </div>
  );
};
