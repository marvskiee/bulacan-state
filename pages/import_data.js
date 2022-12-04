import React, { useState } from "react";
import {
  InsertSuccessModal,
  ModalLayout,
  Navbar,
  StudentCard,
  SuccessModal,
} from "../components";
import {
  bulacanChoices,
  classificationChoices,
  gradeChoices,
  pampangaChoices,
  scheduleChoices,
  year3Choices,
  year4Choices,
  yearChoices,
} from "../services/data.services";
import {
  insertManyStudent,
  insertOneStudent,
  updateOneStudent,
} from "../services/student.services";

const import_data = () => {
  const [submitted, setSubmitted] = useState(false);
  const [logs, setLogs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [successRead, setSuccessRead] = useState(-1);
  const [successServer, setSuccessServer] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(0);
  // header checker
  const headerChecker = (datas) => {
    let refDatas = [
      // "fullname",
      // "year",
      // "email",
      // "province",
      // "municipality",
      "number",
      // "classification",
      // "section",
      "programming 1",
      "p1 grade",
      "programming 2",
      "p2 grade",
      "oop 1",
      "oop1 grade",
      "oop 2",
      "oop2 grade",
      "das",
      "das grade",
    ];
    for (let d in datas) {
      // console.log(datas[d]);
      if (datas[d] != refDatas[d]) {
        return false;
      }
    }
    return true;
  };
  const dataChecker = (field, value, support) => {
    switch (field) {
      // case "fullname":
      //   if (value.length < 3) {
      //     console.log("fullname");
      //     return false;
      //   }
      //   break;
      // case "section":
      //   if (support == "3rd" && !year3Choices.includes(value)) {
      //     console.log("fullname");
      //     return false;
      //   } else if (support == "4th" && !year4Choices.includes(value)) {
      //     console.log("fullname");
      //     return false;
      //   }
      //   break;
      // case "email":
      //   if (value.length < 6 || !value.includes("@") || !value.includes(".")) {
      //     console.log("fullname");

      //     return false;
      //   }
      //   break;
      // case "province":
      //   if (value.length < 6 || (value !== "Bulacan" && value != "Pampanga")) {
      //     console.log("fullname");
      //     return false;
      //   }
      //   break;
      // case "municipality":
      //   if (support == "Bulacan" && !bulacanChoices.includes(value)) {
      //     console.log("fullname");
      //     return false;
      //   } else if (support == "Pampanga" && !pampangaChoices.includes(value)) {
      //     console.log("fullname");
      //     console.log(support);
      //     return false;
      //   }

      //   break;
      case "number":
        if (value.length > 3) {
          console.log("fullname");
          return false;
        }
        break;
      // case "classification":
      //   if (value.length < 6 || !classificationChoices.includes(value)) {
      //     console.log("fullname");
      //     return false;
      //   }
      //   break;
      // case "year":
      //   if (!yearChoices.includes(value)) {
      //     console.log(value);
      //     return false;
      //   }
      //   break;
      case "p1 grade":
      case "p2 grade":
      case "oop1 grade":
      case "oop2 grade":
      case "das grade":
        if (!gradeChoices.includes(value)) {
          // console.log("fullname");
          return false;
        }
        break;
      case "programming 1":
      case "programming 2":
      case "oop 1":
      case "oop 2":
      case "das":
        // let list = value.split(",");
        // if (list.length != 2) {
        //   // console.log("fullname");
        //   return false;
        // } else {
        if (!scheduleChoices.includes(value)) {
          // console.log("fullname");
          return false;
        }
        // }
        break;
      default:
        // console.log("fullname");
        return false;
    }
    return true;
  };

  const formatData = (datas) => {
    // check header
    if (!headerChecker(datas[0])) {
      setSuccessRead(1);
      return;
    }
    const keys = datas[0];

    let parentTemp = [];
    for (let d in datas) {
      if (d != 0) {
        const targetArray = datas[d];
        let childTemp = {};
        for (let t in targetArray) {
          childTemp[keys[t]] = targetArray[t];
          // console.log(targetArray[t]);
          // if (keys[t] == "municipality") {
          //   if (!dataChecker(keys[t], targetArray[t])) {
          //     setSuccessRead(1);
          //     setData(null);
          //     return;
          //   }
          // }
          //   if (keys[t] == "municipality") {
          //     if (!dataChecker(keys[t], targetArray[t], childTemp["province"])) {
          //       setSuccessRead(1);
          //       setData(null);
          //       return;
          //     }
          //   }
          //   if (keys[t] == "section") {
          //     if (!dataChecker(keys[t], targetArray[t], childTemp["year"])) {
          //       setSuccessRead(1);
          //       setData(null);
          //       return;
          //     }
          //   }
        }
        let programming1 = childTemp["programming 1"];
        let programming2 = childTemp["programming 2"];
        let oop1 = childTemp["oop 1"];
        let oop2 = childTemp["oop 2"];
        let das = childTemp["das"];

        let p1_grade = childTemp["p1 grade"];
        let p2_grade = childTemp["p2 grade"];
        let oop1_grade = childTemp["oop1 grade"];
        let oop2_grade = childTemp["oop2 grade"];
        let das_grade = childTemp["das grade"];

        childTemp["subjects"] = [
          [programming1, p1_grade],
          [programming2, p2_grade],
          [oop1, oop1_grade],
          [oop2, oop2_grade],
          [das, das_grade],
        ];
        console.log(childTemp);
        parentTemp = [...parentTemp, childTemp];
      }
    }
    setData(parentTemp);
    console.log(parentTemp);
  };
  const changeHandler = (e) => {
    setSubmitted(false);
    setData(null);
    setSuccessServer(false);
    setLogs(null);
    setSuccessRead(-1);
    setIsLoading(true);
    setTimeout(() => {
      readXlsxFile(e[0])
        .then(function (datas) {
          formatData(datas);
          setIsLoading(false);
        })
        .catch(function (e) {
          setSuccessRead(0);
          console.log(e);
          setIsLoading(false);
        });
    }, 2000);
  };
  const submitHandler = async (datas) => {
    let newData = [];
    for (let d in datas) {
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
      } = data[d];
      const tmData = {
        // fullname,
        // section,
        // email,
        // province,
        // municipality,
        number,
        // classification,
        // year,
        subjects,
      };
      newData = [...newData, tmData];
    }
    let tmp_logs = [];
    for (let i in newData) {
      try {
        const res = await insertOneStudent(newData[i]);
        if (res.success) {
          // setData(newData.splice(1));
          tmp_logs = [
            ...tmp_logs,
            `Student number ${newData[i].number} has been added!`,
          ];
        } else {
          if (res.errors.code == 11000) {
            const res = await updateOneStudent(newData[i]?.number, newData[i]);
            if (res.success) {
              tmp_logs = [
                ...tmp_logs,
                `Student number ${newData[i].number} has been updated!`,
              ];
            }
          }
        }
      } catch (e) {}
      setLogs(tmp_logs);
    }
    setSuccessServer(true);
  };
  const errorHandler = (num) => {
    switch (num) {
      case 0:
        return "Wrong file type! Please insert excel type only!";
      case 1:
        return `There is something wrong in your excel file please follow the
        required format and try again!`;
      case 2:
        return `Some of the data is already exist you have to manually update them`;
      case 3:
        return `Something went wrong updating! Please try again later.`;
    }
  };
  return (
    <>
      <Navbar title="Import Data" script={true} />
      {modalSuccess != 0 && (
        <SuccessModal handler={setModalSuccess} mode={modalSuccess} />
      )}
      <div className="min-h-home z-10 flex items-center justify-center flex-col mx-7">
        <div className="max-h-home overflow-y-auto gap-4 flex flex-col rounded-lg bg-white p-8">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Import Data</p>
            <button className="p-2 px-4 bg-violet-500 text-white rounded-md">
              <a target="_blank" href="excel_cheat_sheet.pdf">
                Excel Format Cheat Sheet
              </a>
            </button>
          </div>
          <label className="">
            Make sure to follow the instruction and content format of excel
            sheet or else it may show error. You may read in the tutorial on how
            to proceed and create xlsx or excel file.
          </label>
          {successRead > -1 && (
            <span className="text-center p-2 rounded-md border-dashed border-2 border-rose-500 bg-rose-100 text-rose-500">
              {errorHandler(successRead)}
            </span>
          )}
          {isLoading ? (
            <span className="p-2 rounded-md text-center text-white bg-blue-500">
              Reading File. Please wait ...
            </span>
          ) : (
            <div className="flex gap-4">
              <form
                className="w-full"
                method="post"
                encType="multipart/form-data"
              >
                <div className="flex gap-4 flex-col md:flex-row">
                  <input
                    type="file"
                    name="excel_file"
                    onChange={(e) => changeHandler(e.target.files)}
                    className="w-full p-4 py-2 border rounded-lg"
                  />
                </div>
              </form>
            </div>
          )}
          {!submitted ? (
            data &&
            data?.length > 0 && (
              <>
                <button
                  className="p-2 text-white bg-blue-500 rounded-md"
                  onClick={() => {
                    submitHandler(data);
                    setSubmitted(true);
                  }}
                >
                  The data is now ready. Upload to server?
                </button>
                <p className="font-semibold text-lg">
                  Records Found: {data.length}
                </p>
              </>
            )
          ) : (
            <>
              {successServer ? (
                <p
                  className={`bg-emerald-100 border border-dashed text-center border-emerald-500 text-emerald-500 p-2 px-4 rounded-md`}
                >
                  {logs?.length} student have been successfully saved!
                </p>
              ) : (
                <p
                  className={`bg-blue-100 border border-dashed text-center border-blue-500 text-blue-500 p-2 px-4 rounded-md`}
                >
                  {logs?.length || 0} of {data?.length || 0} is now proccessing,
                  Please wait
                </p>
              )}
            </>
          )}
          {data && (
            <div className="mt-4 flex gap-4 flex-col ">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-md border-dashed border"
                >
                  {logs && (
                    <p className="mb-2 p-2 px-4 rounded-md text-emerald-500 border border-dashed border-emerald-500 bg-emerald-100">
                      {logs[index]}
                    </p>
                  )}
                  <StudentCard fields={item} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default import_data;
