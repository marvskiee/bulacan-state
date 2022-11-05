import React from "react";
import GraphBar from "../Bar/GraphBar";

const GraphCard = ({ mode, bar, average }) => {
  const headers = [
    "Programming 1:",
    "Programming 2:",
    "Object Oriented Programming 1:",
    "Object Oriented Programming 2:",
    "Data Structures and Algorithm:",
  ];
  const schedType = [
    { name: "Morning", time: "7:00 AM - 11:00 AM" },
    { name: "Afternoon", time: "2:00 PM - 5:00 PM" },
    { name: "Evening", time: "6:00 PM - 8:00 PM" },
  ];
  const colors = ["bg-black", "bg-rose-600", "bg-emerald-600"];
  return (
    <>
      <div className="flex gap-10 items-center sm:flex-row flex-col sm:items-center">
        <div className={`${colors[mode]} w-40 h-80`}>
          <GraphBar height={bar[mode]} />
        </div>
        <div className="flex gap-4 flex-col">
          <p className="text-2xl font-semibold uppercase">
            {schedType[mode].name} Schedule
          </p>
          <p className="text-xl font-semibold">({schedType[mode].time})</p>
          <p className="text-xl font-semibold uppercase">average grade</p>
          <table>
            <tbody>
              {headers.map((item, index) => (
                <tr className="uppercase font-semibold" key={index}>
                  <td>{item}</td>
                  <td className="pl-4 text-right">{average[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GraphCard;
