import {ImSpinner} from "react-icons/im";
import React from "react";

interface ExecutingOverlayProps {
  message: string;
}

const ExecutingOverlay: React.FC<ExecutingOverlayProps> = ({message}) => {
  return (
    <div
      className="lg:absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-40 text-white text-xl">
      <div className="flex items-center">
        <p className="font-sans font-bold">{message}</p>
        <ImSpinner className="animate-spin ml-2" style={{color: 'white', zIndex: 50}}/>
      </div>
    </div>
  );
};

export default ExecutingOverlay;