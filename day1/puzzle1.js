const fs = require("fs");

const fileContent = fs.readFileSync("day1/input1.txt");

const fileContentAsArray = fileContent?.toString().split("\n");

let score = 0;

for (let index = 0; index < fileContentAsArray.length; index++) {
  const element = fileContentAsArray[index];

  const firstAndLastDigit = element
    .split("")
    .filter((letter) => letter.match(/\d/));

  const firstDigit = firstAndLastDigit[0];
  const lastDigit = firstAndLastDigit.at(-1);

  combinedValue = Number.parseInt(`${firstDigit}${lastDigit}`, 10);

  score += combinedValue;
}

console.log(score);
