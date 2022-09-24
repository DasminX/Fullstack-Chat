import { FC } from "react";

const modalStyles =
  "bg-black/80 w-full h-screen fixed z-50 flex items-center justify-center flex-col";
const paragraphStyles =
  "text-2xl tracking-wider font-thin -translate-y-1/3 select-none";

type LoaderFCType = FC<{ message: string }>;

export const Loader: LoaderFCType = ({ message }) => {
  return (
    <div className={modalStyles}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: "auto",
            background: "transparent",
            display: "block",
          }}
          width="224px"
          height="224px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            r="20"
            strokeWidth="4"
            stroke="#a0a0a0"
            strokeDasharray="31.41592653589793 31.41592653589793"
            fill="none"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1.5384615384615383s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            ></animateTransform>
          </circle>
          <circle
            cx="50"
            cy="50"
            r="13"
            strokeWidth="4"
            stroke="#667395"
            strokeDasharray="20.420352248333657 20.420352248333657"
            strokeDashoffset="20.420352248333657"
            fill="none"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1.5384615384615383s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 50 50;-360 50 50"
            ></animateTransform>
          </circle>
          <circle
            cx="50"
            cy="50"
            r="6"
            strokeWidth="4"
            stroke="#a0a0a0"
            strokeDasharray="20.420352248333657 20.420352248333657"
            strokeDashoffset="20.420352248333657"
            fill="none"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1.5384615384615383s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            ></animateTransform>
          </circle>
        </svg>
        <p className={paragraphStyles}>{message}</p>
      </div>
    </div>
  );
};
