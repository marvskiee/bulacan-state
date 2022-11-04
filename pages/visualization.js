import React, { useEffect } from "react";
import { Navbar } from "../components";
import { dotCount } from "../services/graph.services";
import { startVisual } from "../services/visualization.services";

const Visualization = () => {
  useEffect(async () => {
    const dots = await dotCount();
    console.log(dots);
    setTimeout(() => {
      startVisual(dots.green, dots.black, dots.red);
    }, 2000);
  }, []);
  return (
    <>
      <Navbar title="Cluster Visualization" />
      <div className="min-h-home z-10 flex items-center justify-center flex-col mx-7">
        <div className="flex flex-col rounded-lg bg-white p-8 items-center justify-center">
          <p className="text-2xl font-semibold mb-4">Cluster Visualization</p>
          <div className="flex items-center justify-center gap-10 sm:flex-row flex-col ">
            <div className="flex flex-col gap-4">
              <p className="text-center font-semibold text-2xl">Legend</p>
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
            <div className="w-96 h-96">
              <svg id="canvas" viewBox="0 0 400 400" className="w-96 h-96">
                <line
                  x1="-20"
                  y1="0"
                  x2="200"
                  y2="220"
                  strokeWidth={1}
                  stroke="black"
                />
                <line
                  x1="420"
                  y1="0"
                  x2="200"
                  y2="220"
                  stroke="black"
                  strokeWidth={1}
                />
                <line
                  x1="200"
                  y1="220"
                  x2="200"
                  y2="400"
                  stroke="black"
                  strokeWidth={1}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Visualization;
