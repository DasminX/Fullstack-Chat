import ReactDOM from "react-dom";
import { ModalMessageType } from "../../types/componentsTypes";

const modalContentDivWrapperStyles =
  "bg-slate-300 rounded-2xl w-1/3 h-1/3 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 border-4 border-red-500 p-10 flex flex-col justify-around items-center text-2xl text-center";
const modalContentButtonStyles =
  "rounded-md bg-slate-500 px-8 py-2 text-white hover:bg-cyan-700 hover:scale-105 transition duration-300";
const modalOverlayStyles = "bg-black/80 w-full h-screen fixed z-10";

const portalModalContentDiv = document.getElementById(
  "modal-content-root"
) as HTMLDivElement;
const portalModalOverlayDiv = document.getElementById(
  "modal-overlay-root"
) as HTMLDivElement;

const ModalContent: ModalMessageType = ({ message, hideModalHandler }) => {
  return (
    <div className={modalContentDivWrapperStyles}>
      <h1>{message}</h1>
      <button className={modalContentButtonStyles} onClick={hideModalHandler}>
        OK.
      </button>
    </div>
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
  return <div className={modalOverlayStyles}></div>;
};
