const Loading = () => {
  return (
    <div className="absolute inset-0 w-full h-[85vh] flex justify-center items-center text-2xl font-semibold">
      <div className="flex">
        <div className="relative">
          <div className="w-16 h-16 rounded-full absolute border-4 border-solid border-gray-200"></div>

          <div className="w-16 h-16 rounded-full animate-spin absolute border-4 border-solid border-emerald-500 border-t-transparent shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
