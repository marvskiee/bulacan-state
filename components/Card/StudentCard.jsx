import React from "react";

const StudentCard = ({ fields, index }) => {
  // console.log(field);
  const table_headers = ["Prog 1", "Prog 2", "OOP 1", "OOP 2", "DSA"];
  const {
    // fullname,
    // section,
    // email,
    // province,
    // municipality,
    number,
    // classification,
    // year,
    subjects,
  } = fields;
  return (
    <>
      <div className="grid-cols-1 sm:grid-cols-2 grid">
        {/* <p>Name: {fullname}</p>
        <p>Section: {section}</p>
        <p>Year: {year}</p>
        <p>Email: {email}</p>
        <p>Province: {province}</p>
        <p>Municipality: {municipality}</p> */}
        <p>Student Number: {number}</p>
        {/* <p>Student Classification: {classification}</p> */}
      </div>
      <p>Subjects: Grades and Schedules </p>
      <table className="border-collapse border border-slate-400 w-full">
        <thead className="border border-black bg-slate-900 text-white">
          <tr>
            {table_headers.map((item, childindex) => (
              <th key={childindex}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr key={index}>
            {subjects?.map((item, childindex) => (
              <td className="text-center" key={childindex}>
                {item[0] || "No Grade"}
                <br /> {item[1] || "No Schedule"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default StudentCard;
