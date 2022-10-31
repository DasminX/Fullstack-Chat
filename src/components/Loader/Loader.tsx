import { Flex } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      pos="fixed"
      align="center"
      justify="center"
      direction="column"
      zIndex="50"
      className="bg-black/80"
    >
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
        <p className="text-2xl tracking-wider font-thin -translate-y-1/3 select-none">
          Please wait...
        </p>
      </div>
    </Flex>
  );
};
