export const ChatView = () => {
  return (
    <section className="col-start-5 col-end-10 row-start-1 my-20 row-end-6 rounded-2xl flex flex-col 2xl:col-start-6 2xl:col-end-9 2xl:row-start-2 2xl:row-end-5 2xl:my-0 2xl:scale-110">
      <div className="title w-full basis-16 bg-cyan-700  rounded-t-xl flex justify-evenly items-center">
        <h1 className="text-xl font-mono basis-5/6 text-center">
          Wariaci React
        </h1>
        <button className="font-extrabold text-2xl hover:text-red-4 bnv00">
          X
        </button>
      </div>
      <div className="content grow p-2 bg-slate-200"></div>
      <div className="sendmsg basis-16  bg-cyan-700  flex justify-between items-center px-10 py-1 rounded-b-xl">
        <input
          type="text"
          placeholder="Send a message..."
          className="h-2/3 w-4/5 px-4 py-1 text-black placeholder:text-black"
        />
        <button className="bg-white border-2 border-cyan-700 text-black px-4 py-2 rounded-md hover:bg-slate-400 hover:border-transparent hover:text-inherit">
          Send
        </button>
      </div>
    </section>
  );
};
