import { AddRoomFormControlFCType } from "../../../../types/componentsTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const formControlStyles =
  "relative bg-white w-full h-auto p-3 flex justify-between text-black border-2 border-cyan-700 rounded-md my-4";

const labelTextStyles = "flex items-center justify-center ";

const inputTextStyles = "border-2 border-black rounded-xl px-2 py-1";

const checkboxStyles = "basis-1/2";

const eyeIconStyles = "self-center ml-2 cursor-pointer";

export const AddRoomFormControl: AddRoomFormControlFCType = ({
  isCheckboxChecked,
  isPasswordShown,
  labelText,
  htmlForID,
  type,
  onChangeCheckboxHandler,
  toggleShowPasswordHandler,
}) => {
  const inputClassName = type === "checkbox" ? checkboxStyles : inputTextStyles;

  const htmlContent = (
    <div className={`form-control ${formControlStyles}`}>
      <label className={labelTextStyles} htmlFor={htmlForID}>
        {labelText}
      </label>
      <input
        ref={}
        className={inputClassName}
        type={
          htmlForID !== "roomPassword"
            ? type
            : isPasswordShown
            ? "text"
            : "password"
        }
        id={htmlForID}
        onChange={type === "checkbox" ? onChangeCheckboxHandler : undefined}
      />
      {htmlForID === "roomPassword" && (
        <FontAwesomeIcon
          icon={faEye}
          className={eyeIconStyles}
          onClick={toggleShowPasswordHandler}
        />
      )}
    </div>
  );

  if (htmlForID === "roomPassword" && !isCheckboxChecked) {
    return <></>;
  }

  return htmlContent;
};
