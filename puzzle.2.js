const { log } = require("console");
const fs = require("fs");

const fileContent = fs.readFileSync("day4/input.txt");

const fileContentAsArray = fileContent?.toString().split("\n");

let copies = {};

function getInitialCardCopies() {
  for (let index = 1; index < fileContentAsArray.length + 1; index++) {
    copies[index] = 1;
  }
}

getInitialCardCopies();

fileContentAsArray.forEach((card, index) => {
  const cardNumber = index + 1;
  const cardContent = card.split(":")[1]?.trim();
  const scratchedNumbers = cardContent
    .split("|")[0]
    .split(" ")
    .map((number) => Number.parseInt(number.trim(), 10))
    .filter((number) => !Number.isNaN(number));
  const myNumbers = cardContent
    .split("|")[1]
    ?.split(" ")
    .map((number) => Number.parseInt(number.trim(), 10))
    .filter((number) => !Number.isNaN(number));

  const numberOfMatches = scratchedNumbers.filter((number) =>
    myNumbers.includes(number)
  ).length;

  if (numberOfMatches > 0) {
    for (
      let copyIndex = cardNumber;
      copyIndex < numberOfMatches + cardNumber;
      copyIndex++
    ) {
      copies[copyIndex + 1] = copies[copyIndex + 1] + 1;
      for (let index = 1; index < copies[cardNumber]; index++) {
        copies[copyIndex + 1] = copies[copyIndex + 1] + 1;
      }
    }
  }
});

let score = 0;

Object.values(copies).forEach((value) => {
  score += value;
});

console.log(score);
