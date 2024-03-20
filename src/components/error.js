import React from "react";

function ErrorPage() {
  return (
    <div className=" container mx-auto">
      <div className="flex justify-center items-center w-full h-screen flex-col">
        <h1 className="text-2xl md:text-3xl">404 Not Found</h1>
        <p className="md:text-xl mt-3">
          The page you're looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
