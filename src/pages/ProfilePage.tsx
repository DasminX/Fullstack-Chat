import { useContext, useRef, useState } from "react";
import { Nav } from "../components/LoggedInView/Nav/Nav";
import { ErrorModal } from "../components/Modal/Modal";
import { AuthContext } from "../context/auth-context";

export const ProfilePage = () => {
  const [isChangingName, setIsChangingName] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const { isAuth } = useContext(AuthContext);

  const inputNameRef = useRef<HTMLInputElement>(null);

  const changeNameHandler = () => {
    setIsChangingName(true);
  };

  const saveChangingNameHandler = () => {
    if (
      inputNameRef.current!.value.length < 3 ||
      inputNameRef.current!.value.length > 12
    ) {
      return setIsErrorModal(true);
    }
    setIsChangingName(false);
  };

  const hideModalHandler = () => {
    setIsErrorModal(false);
  };

  return (
    <>
      {isAuth && <Nav />}
      <main className="bg-slate-900 min-h-[calc(100vh-3.5rem)] h-auto w-full text-2xl grid grid-cols-12 grid-flow-row-dense">
        <section className="col-start-3 col-end-11 my-20 bg-slate-300 rounded-2xl xl:col-start-4 xl:col-end-10">
          <div className="user-info w-full h-32 rounded-t-2xl flex px-8 py-4 border-b-2 border-cyan-700">
            <div className="user-image basis-1/4 h-full flex justify-center items-center">
              <div className="w-20 h-20">
                <img
                  className="object-cover rounded-full cursor-pointer"
                  src="https://media.istockphoto.com/vectors/letter-e-vector-design-template-vector-id1181190850"
                  alt="profileimg"
                />
              </div>
            </div>
            <div className="basis-1/2 flex items-center justify-center">
              <input
                type="text"
                ref={inputNameRef}
                defaultValue={"Username"}
                className={`${
                  isChangingName
                    ? "bg-white border-2 border-black"
                    : "bg-transparent"
                } rounded-md px-2 py-1`}
                onFocus={changeNameHandler}
              />
            </div>
            {isChangingName && (
              <button
                className="rounded-md bg-slate-700 px-8 py-2 hover:bg-cyan-700 hover:scale-105 transition duration-300 self-center text-base text-white"
                onClick={saveChangingNameHandler}
              >
                Change!
              </button>
            )}
          </div>
        </section>
        {isErrorModal && (
          <ErrorModal
            message={"Username must be between 3-12 characters long."}
            hideModalHandler={hideModalHandler}
          />
        )}
      </main>
    </>
  );
};
