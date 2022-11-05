import React, { useState, useEffect } from "react";
import { GraphBar, GraphCard, ModalLayout, Navbar } from "../components";
import { averageCount, dotCount } from "../services/graph.services";

const Graph = () => {
  const [bar, setBar] = useState([]);
  const [average, setAverage] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  useEffect(async () => {
    const dots = await dotCount();
    const overallDots = dots.black + dots.green + dots.red;
    setBar([
      ...bar,
      Math.round((dots.black / overallDots) * 100),
      Math.round((dots.red / overallDots) * 100),
      Math.round((dots.green / overallDots) * 100),
    ]);
    const res = await averageCount();
    if (res) {
      setAverage(res);
    }
  }, []);
  const [modalMode, setModalMode] = useState(-1);
  return (
    <>
      <Navbar title="Cluster Graph" />
      {modalMode > -1 && (
        <ModalLayout>
          <GraphCard mode={modalMode} bar={bar} average={average[modalMode]} />
          <div className="flex items-center justify-end mt-4">
            <button
              onClick={() => setModalMode(-1)}
              className="p-4 py-2 rounded-md text-white bg-slate-500"
            >
              Back
            </button>
          </div>
        </ModalLayout>
      )}
      <div className="min-h-home z-10 flex items-center justify-center flex-col mx-7">
        <div className="max-h-home overflow-y-auto gap-4 flex flex-col rounded-md bg-white p-8">
          <p className="text-2xl font-semibold mb-4 text-center">
            Cluster Graph
          </p>
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
            <div className="flex w-62 h-62 gap-4 border-b border-black px-2">
              <a className="cursor-pointer" onClick={() => setModalMode(0)}>
                <div className="bg-black w-20 h-80">
                  <GraphBar height={bar[0]} />
                </div>
              </a>
              <a className="cursor-pointer" onClick={() => setModalMode(1)}>
                <div className="bg-rose-600 w-20 h-80">
                  <GraphBar height={bar[1]} />
                </div>
              </a>
              <a className="cursor-pointer" onClick={() => setModalMode(2)}>
                <div className="bg-emerald-600 w-20 h-80">
                  <GraphBar height={bar[2]} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
