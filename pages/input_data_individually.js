import Link from "next/link";
import React, { useState, useRef } from "react";
import { ModalLayout, Navbar, StudentCard, SuccessModal } from "../components";
import {
  bulacanChoices,
  gradeChoices,
  pampangaChoices,
  scheduleChoices,
  year3Choices,
  year4Choices,
} from "../services/data.services";
import {
  getOneStudent,
  insertOneStudent,
  updateOneStudent,
} from "../services/student.services";

const input_data_individually = () => {
  const [oldData, setOldData] = useState(null);
  const [data, setData] = useState(null);

  const [modalSuccess, setModalSuccess] = useState(0);
  const [updateModal, setUpdateModal] = useState();
  // const fullnameRef = useRef();
  // const sectionRef = useRef();
  // const emailRef = useRef();
  // const municipalityRef = useRef();
  const numberRef = useRef();
  // const classificationRef = useRef();
  // gradesRef
  const grade1Ref = useRef();
  const grade2Ref = useRef();
  const grade3Ref = useRef();
  const grade4Ref = useRef();
  const grade5Ref = useRef();
  // scheduleRef
  const sched1Ref = useRef();
  const sched2Ref = useRef();
  const sched3Ref = useRef();
  const sched4Ref = useRef();
  const sched5Ref = useRef();

  const [province, setProvince] = useState("Bulacan");
  const [year, setYear] = useState("3rd");
  const yearComboBox = () => {
    let choices = [];
    if (year == "3rd") {
      choices = year3Choices;
    } else {
      choices = year4Choices;
    }

    return (
      <select
        ref={sectionRef}
        className="px-4 p-2  rounded-md border"
        id="year"
      >
        {choices.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  const municipalityComboBox = () => {
    let choices = [];
    if (province == "Bulacan") {
      choices = bulacanChoices;
    } else {
      choices = pampangaChoices;
    }

    return (
      <select
        ref={municipalityRef}
        className="p-2 px-4 rounded-md border"
        id="municipality"
      >
        {choices.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  const gradesComboBox = (id, ref) => {
    return (
      <select ref={ref} className="p-2 px-4 rounded-md border" id={id}>
        {gradeChoices.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  const schedulesComboBox = (id, ref) => {
    return (
      <select ref={ref} className="px-4 p-2 rounded-md border" id={id}>
        {scheduleChoices.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const newData = {
      // fullname: fullnameRef.current?.value,
      // section: sectionRef.current?.value,
      // email: emailRef.current?.value,
      // province,
      // year,
      // municipality: municipalityRef.current?.value,
      number: numberRef.current?.value,
      // classification: classificationRef.current?.value,
      subjects: [
        [sched1Ref.current?.value, grade1Ref.current?.value],
        [sched2Ref.current?.value, grade2Ref.current?.value],
        [sched3Ref.current?.value, grade3Ref.current?.value],
        [sched4Ref.current?.value, grade4Ref.current?.value],
        [sched5Ref.current?.value, grade5Ref.current?.value],
      ],
    };
    const res = await insertOneStudent(newData);
    if (res.success) {
      setModalSuccess(1);
    } else {
      const res = await getOneStudent(newData.number);
      if (res.success) {
        setOldData(res.data);
        setData(newData);
        setUpdateModal(true);
      }
    }
    console.log(newData);
  };
  const updateHandler = async () => {
    const res = await updateOneStudent(oldData.number, data);
    if (res.success) {
      setUpdateModal(false);
      setModalSuccess(2);
    }
  };
  const clearFormHandler = () => {
    // fullnameRef.current.value = "";
    // sectionRef.current.value = "";
    // emailRef.current.value = "";
    // setProvince("Bulacan");
    // setYear("3rd");
    // sectionRef.current.value = "A-G1, A-G2";
    // municipalityRef.current.value = "Angat";
    numberRef.current.value = "";
    // classificationRef.current.value = "Regular";
    // // subjects: [
    sched1Ref.current.value = "--";
    grade1Ref.current.value = "0";
    sched2Ref.current.value = "--";
    grade2Ref.current.value = "0";
    sched3Ref.current.value = "--";
    grade3Ref.current.value = "0";
    sched4Ref.current.value = "--";
    grade4Ref.current.value = "0";
    sched5Ref.current.value = "--";
    grade5Ref.current.value = "0";
    // // ],
  };
  return (
    <>
      <Navbar title="Input Data" />{" "}
      {modalSuccess > 0 && (
        <SuccessModal handler={setModalSuccess} mode={modalSuccess} />
      )}
      {updateModal && (
        <ModalLayout>
          <div className="flex gap-4 flex-col">
            <p className="bg-rose-100 text-center text-rose-500 p-2 px-4 rounded-md border border-dashed border-rose-500">
              The student number already exists.
            </p>
            {/* <p className="text-center bg-blue-100 text-blue-500 p-2 px-4 rounded-md border border-dashed border-blue-500">
              Old Data
            </p>
            {oldData && <StudentCard fields={oldData} index={0} />}
            <p className="text-center bg-blue-100 text-blue-500 p-2 px-4 rounded-md border border-dashed border-blue-500">
              New Data
            </p>
            {data && <StudentCard fields={data} index={0} />} */}
            <div className="flex items-center justify-end gap-4">
              {/* <button
                onClick={() => updateHandler()}
                className="rounded-md text-white px-4 p-2 bg-blue-500"
              >
                Continue
              </button> */}
              <button
                onClick={() => setUpdateModal(false)}
                className="rounded-md text-white px-4 p-2 bg-slate-500"
              >
                Close
              </button>
            </div>
          </div>
        </ModalLayout>
      )}
      <div className="min-h-data z-10 flex items-center justify-center flex-col mx-7">
        <div className="overflow-y-auto gap-4 flex flex-col rounded-lg sm:w-auto w-full bg-white p-8">
          <form method="POST" className="w-full" onSubmit={submitHandler}>
            {/* <p className=" text-center mb-4 bg-emerald-500 text-white p-2 rounded-md font-semibold">
              Student data has been added successfully!
            </p>
            <p className=" text-center mb-4 bg-rose-500 text-white p-2 rounded-md font-semibold">
              Student Number already exist!
            </p>
            <p className=" text-center mb-4 bg-rose-500 text-white p-2 rounded-md font-semibold">
              Something went wrong, Please try again!
            </p> */}
            <div className="flex gap-4 flex-col">
              <div id="page1">
                <p className="text-2xl font-semibold mb-4">Student Profile</p>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="student_number"
                    className="font-semibold uppercase"
                  >
                    Student Number:
                  </label>
                  <input
                    ref={numberRef}
                    required
                    type="number"
                    className="px-4 p-2 rounded-md border"
                    id="student_number"
                    placeholder="10000132667"
                  />
                </div>
                {/* <div className="flex gap-4 sm:flex-row flex-col"> */}
                {/* <div className="flex gap-4 flex-col">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="flname"
                        className="font-semibold uppercase"
                      >
                        Full Name:
                      </label>
                      <input
                        defaultValue={fullnameRef.current?.value}
                        ref={fullnameRef}
                        required
                        type="text"
                        className="px-4 p-2 rounded-md border"
                        id="flname"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="year" className="font-semibold uppercase">
                        Year:
                      </label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        className="px-4 p-2 rounded-md border"
                        id="year"
                      >
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="section"
                        className="font-semibold uppercase"
                      >
                        Section:
                      </label>
                      {yearComboBox()}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="font-semibold uppercase"
                      >
                        Email:
                      </label>
                      <input
                        ref={emailRef}
                        required
                        type="email"
                        className="px-4 p-2 rounded-md border"
                        id="email"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div> */}
                {/* <div className="flex gap-4 flex-col"> */}
                {/* <div className="flex flex-col gap-2">
                      <label
                        htmlFor="province"
                        className="font-semibold uppercase"
                      >
                        Province:
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                        className="px-4 p-2 rounded-md border"
                        id="province"
                        placeholder="John Doe"
                      >
                        <option value="Bulacan">Bulacan</option>
                        <option value="Pampanga">Pampanga</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="municipality"
                        className="font-semibold uppercase"
                      >
                        Municipality:
                      </label>
                      {municipalityComboBox()}
                    </div> */}
                {/* student number  */}

                {/* <div className="flex flex-col gap-2">
                      <label
                        htmlFor="classification"
                        className="font-semibold uppercase"
                      >
                        Student Classification:
                      </label>
                      <select
                        ref={classificationRef}
                        required
                        className="px-4 p-2 rounded-md border"
                        id="classification"
                      >
                        <option value="Regular">Regular</option>
                        <option value="Irregular">Irregular</option>
                      </select>
                    </div> */}
                {/* </div> */}
                {/* </div> */}
              </div>
              <div className="sm:flex-row flex-col flex gap-5">
                <div id="page2">
                  <p className="text-2xl font-semibold mb-4">Input Grades</p>
                  <div className="gap-4 flex flex-col">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="grade1"
                        className="font-semibold uppercase"
                      >
                        Programming 1
                      </label>
                      {gradesComboBox("grade1", grade1Ref)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="grade2"
                        className="font-semibold uppercase"
                      >
                        Programming 2
                      </label>
                      {gradesComboBox("grade2", grade2Ref)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="grade3"
                        className="font-semibold uppercase"
                      >
                        Object Programming 1
                      </label>
                      {gradesComboBox("grade3", grade3Ref)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="grade4"
                        className="font-semibold uppercase"
                      >
                        Object Programming 2
                      </label>
                      {gradesComboBox("grade4", grade4Ref)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="grade5"
                        className="font-semibold uppercase"
                      >
                        Data Structure and Algorithm
                      </label>
                      {gradesComboBox("grade5", grade5Ref)}
                    </div>
                  </div>
                </div>
                <div id="page3">
                  <p className="text-2xl font-semibold mb-4">Input Schedules</p>
                  <div className="gap-4 flex flex-col">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="sched1"
                        className="font-semibold uppercase"
                      >
                        Programming 1
                      </label>
                      {schedulesComboBox("sched1", sched1Ref)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="sched2"
                        className="font-semibold uppercase"
                      >
                        Programming 2
                      </label>
                      {schedulesComboBox("sched2", sched2Ref)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="sched3"
                        className="font-semibold uppercase"
                      >
                        Object Programming 1
                      </label>
                      {schedulesComboBox("sched3", sched3Ref)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="sched4"
                        className="font-semibold uppercase"
                      >
                        Object Programming 2
                      </label>
                      {schedulesComboBox("sched4", sched4Ref)}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="sched5"
                        className="font-semibold uppercase"
                      >
                        Data Structure and Algorithm
                      </label>
                      {schedulesComboBox("sched5", sched5Ref)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-4">
              <div className="flex gap-4">
                <button className="p-2 px-4 rounded-md text-white bg-blue-500">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={clearFormHandler}
                  className="p-2 px-4 rounded-md text-white bg-slate-500"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      ;
    </>
  );
};

export default input_data_individually;
