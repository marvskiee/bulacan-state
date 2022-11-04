import React from "react";
import ModalLayout from "../Layout/ModalLayout";

const SuccessModal = ({ handler, mode }) => {
  return (
    <ModalLayout>
      {mode == 1 && (
        <p className="mb-2 text-xl font-semibold">
          Data has been added successfully
        </p>
      )}
      {mode == 2 && (
        <p className="mb-2 text-xl font-semibold">
          Data has been updated successfully
        </p>
      )}
      <button
        onClick={() => handler(0)}
        className="w-full bg-slate-900 rounded-md p-2 text-white"
      >
        Close
      </button>
    </ModalLayout>
  );
};

export default SuccessModal;
