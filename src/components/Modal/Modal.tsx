import { Button, Flex } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import { ModalMessageType } from "../../types/componentsTypes";

const portalModalContentDiv = document.getElementById(
  "modal-content-root"
) as HTMLDivElement;
const portalModalOverlayDiv = document.getElementById(
  "modal-overlay-root"
) as HTMLDivElement;

const ModalContent: ModalMessageType = ({ message, hideModalHandler }) => {
  return (
    <Flex
      rounded="2xl"
      w="33.333%"
      h="33.333%"
      pos="fixed"
      top="33.333%"
      left="50%"
      zIndex="20"
      translateX="-50%"
      translateY="-50%"
      border="4px solid red"
      p="10"
      direction="column"
      justify="space-around"
      align="center"
      fontSize="2xl"
      textAlign="center"
      className="bg-slate-300"
    >
      <h1>{message}</h1>
      <Button
        rounded="md"
        px="8"
        py="2"
        color="white"
        className="bg-slate-500 hover:bg-cyan-700 hover:scale-105 transition duration-300"
        onClick={hideModalHandler}
      >
        OK.
      </Button>
    </Flex>
  );
};

export const ErrorModal: ModalMessageType = ({ message, hideModalHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalContent message={message} hideModalHandler={hideModalHandler} />,
        portalModalContentDiv
      )}
      {ReactDOM.createPortal(<ModalOverlay />, portalModalOverlayDiv)}
    </>
  );
};

const ModalOverlay = () => {
  return <div className="bg-black/80 w-full h-screen fixed z-10"></div>;
};
