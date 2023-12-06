const { time } = require("console");
const fs = require("fs");

const fileContent = fs.readFileSync("day6/input.txt");

const fileContentAsArray = fileContent?.toString().split("\n");

const times = fileContentAsArray[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((time) => Number.parseInt(time, 10))
  .filter((time) => !Number.isNaN(time));

const distances = fileContentAsArray[1]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((distance) => Number.parseInt(distance, 10))
  .filter((distance) => !Number.isNaN(distance));

let score = 0;
const possiblePressTimes = [];

times.forEach((time, timeIndex) => {
  let recordTimes = [];
  let currentSpeed = 0;
  let currentDistance = 0;

  let distance = distances[timeIndex];

  for (let pressTime = 0; pressTime < time; pressTime++) {
    currentSpeed = pressTime;
    const remainingTime = time - pressTime;
    currentDistance = remainingTime * currentSpeed;
    if (currentDistance > distance) {
      recordTimes.push(pressTime);
    }
  }

  possiblePressTimes.push(recordTimes.length);
});

possiblePressTimes.forEach((possiblePressTime) => {
  score = score === 0 ? possiblePressTime : score * possiblePressTime;
});

console.log(score);
