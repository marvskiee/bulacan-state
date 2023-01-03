import Script from "next/script";
import React, { useEffect } from "react";
import { LegendLayout, Navbar } from "../components";
import { dotCount } from "../services/graph.services";
import { startVisual } from "../services/visualization.services";

const Visualization = () => {
  useEffect(() => {
    const load = async () => {
      const dots = await dotCount();
      console.log("meron", dots);
      setTimeout(() => {
        startVisual(dots.green, dots.black, dots.red);
      }, 2000);
    };
    load();
  }, []);
  return (
    <>
      <Navbar title="Cluster Visualization" />
      <div className="min-h-home z-10 flex items-center justify-center flex-col mx-7">
        <div className="flex flex-col rounded-lg bg-white p-8 items-center justify-center h-auto sm:h-screen  sm:max-h-home">
          <p className="text-2xl font-semibold mb-4">Cluster Visualization</p>
          <div className="h-full pb-4 w-full flex sm:items-end items-center justify-center gap-10 sm:flex-row flex-col-reverse ">
            <LegendLayout />
            <div className="w-full h-full">
              <svg id="canvas" viewBox="0 0 400 400" className="w-full h-full">
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
