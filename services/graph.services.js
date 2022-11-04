import {
  eveningScheduleChoices,
  morningScheduleChoices,
  afternoonScheduleChoices,
} from "./data.services";

export const getAllStudent = async () => {
  const res = await fetch("/api/student", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};
export const dotCount = async () => {
  let { data } = await getAllStudent();
  // console.log(data);
  let counterGreen = 0;
  let counterRed = 0;
  let counterBlack = 0;

  for (let d in data) {
    let subject = data[d].subjects;
    // console.log(subject);
    for (let s in subject) {
      console.log(subject[s][0]);
      if (morningScheduleChoices.includes(subject[s][0])) {
        counterBlack += 1;
      } else if (afternoonScheduleChoices.includes(subject[s][0])) {
        counterRed += 1;
      } else if (eveningScheduleChoices.includes(subject[s][0])) {
        counterGreen += 1;
      }
    }
  }
  return { green: counterGreen, black: counterBlack, red: counterRed };
};

// export const averageCount = async () =>{
//   let { data } = await getAllStudent();

//   let average =
//   for (let d in data) {
//     let subject = data[d].subjects;
//     // console.log(subject);
//     for (let s in subject) {
//       console.log(subject[s][0]);
//       if (morningScheduleChoices.includes(subject[s][0])) {
//         counterBlack += 1;
//       } else if (afternoonScheduleChoices.includes(subject[s][0])) {
//         counterRed += 1;
//       } else if (eveningScheduleChoices.includes(subject[s][0])) {
//         counterGreen += 1;
//       }
//     }
//   }
// }
// const
