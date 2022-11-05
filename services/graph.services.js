import {
  eveningScheduleChoices,
  morningScheduleChoices,
  afternoonScheduleChoices,
} from "./data.services";

export const getAllStudent = async () => {
  const res = await fetch("/api/students", {
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
      // console.log(subject[s][0]);
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

export const averageCount = async () => {
  let { data } = await getAllStudent();
  let totalGradeGreen = { total: [0, 0, 0, 0, 0], count: [0, 0, 0, 0, 0] };
  let totalGradeRed = { total: [0, 0, 0, 0, 0], count: [0, 0, 0, 0, 0] };
  let totalGradeBlack = { total: [0, 0, 0, 0, 0], count: [0, 0, 0, 0, 0] };

  for (let d in data) {
    let subject = data[d].subjects;
    for (let s in subject) {
      if (morningScheduleChoices.includes(subject[s][0])) {
        if (parseInt(subject[s][1]) != 0) {
          totalGradeBlack.count[s] += 1;
          totalGradeBlack.total[s] += parseFloat(subject[s][1]);
          // console.log(totalGradeBlack);
          // console.log("break");
        }
      } else if (afternoonScheduleChoices.includes(subject[s][0])) {
        if (parseInt(subject[s][1]) != 0) {
          totalGradeRed.count[s] += 1;
          totalGradeRed.total[s] += parseFloat(subject[s][1]);
        }
      } else if (eveningScheduleChoices.includes(subject[s][0])) {
        if (parseInt(subject[s][1]) != 0) {
          totalGradeGreen.count[s] += 1;
          totalGradeGreen.total[s] += parseFloat(subject[s][1]);
        }
      }
    }
  }

  let totalGrades = [totalGradeBlack, totalGradeRed, totalGradeGreen];
  let tmpGrades = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  console.log(totalGradeBlack, totalGradeRed, totalGradeGreen);
  for (let t in totalGrades) {
    for (let tg in totalGrades[t].total) {
      if (t == 0) {
        tmpGrades[t][tg] = rounded(
          totalGrades[t].total[tg],
          totalGradeBlack.count[tg]
        );
      } else if (t == 1) {
        tmpGrades[t][tg] = rounded(
          totalGrades[t].total[tg],
          totalGradeRed.count[tg]
        );
      } else if (t == 2) {
        tmpGrades[t][tg] = rounded(
          totalGrades[t].total[tg],
          totalGradeGreen.count[tg]
        );
      }
    }
  }
  console.log(tmpGrades);
  return tmpGrades;
};
const rounded = (num1, num2) => {
  console.log(num1, num2);
  if (num1 == 0) {
    return 0;
  }
  let newNum = num1 / num2;
  return (Math.round(newNum * 100) / 100).toFixed(2);
};
