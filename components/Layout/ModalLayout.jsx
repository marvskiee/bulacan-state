import React from "react";

const ModalLayout = ({ children }) => {
  return (
    <div className="top-0 left-0 w-full flex items-center justify-center min-h-screen min-w-screen bg-black/50 fixed z-20">
      <div className="overflow-y-auto max-h-home bg-white rounded-md p-4">
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
