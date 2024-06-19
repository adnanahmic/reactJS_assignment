import React from "react";
import { LoaderIcon } from "../assets";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full border-gray-200 rounded-lg">
      <div role="status">
        <LoaderIcon />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
