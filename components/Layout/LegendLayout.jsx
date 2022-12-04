import React from "react";

const LegendLayout = () => {
  return (
    <div className="flex flex-col gap-4 text-xs">
      <p className="text-center font-semibold text-lg">Legend</p>
      <div className="flex gap-2 flex-col">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-black block"></span>
          <p className="uppercase font-semibold">morning schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-rose-600 block"></span>
          <p className="uppercase font-semibold">afternoon schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-emerald-600 block"></span>
          <p className="uppercase font-semibold">evening schedules</p>
        </div>
      </div>
    </div>
  );
};

export default LegendLayout;
