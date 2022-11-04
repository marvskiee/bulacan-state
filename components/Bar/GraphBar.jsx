import React from "react";

const GraphBar = ({ height }) => {
  return (
    <>
      <div className="bg-white bar transition-all h-0"></div>
      <style jsx>{`
        .bar {
          width: 100%;
          height: ${100 - height}%;
        }
      `}</style>
    </>
  );
};

export default GraphBar;
