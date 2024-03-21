import React from "react";

const LoaderDualBall = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div class="loading w-[80px] h-[40px] relative">
        <div className="absolute w-1/2 h-full rounded-full left-0 bg-[#a67c52] z-10 loading-1"></div>
        <div className="absolute w-1/2 h-full rounded-full left-0 bg-[#262626] loading-2"></div>
      </div>
      <p className="text-xl md:text-2xl text-[#243a48] my-2 text-center">
        Lodaing....
      </p>
    </div>
  );
};

export default LoaderDualBall;
