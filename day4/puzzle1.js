const { log } = require("console");
const fs = require("fs");

const fileContent = fs.readFileSync("day4/input.txt");

const fileContentAsArray = fileContent?.toString().split("\n");

let cards = {};

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

  const newScore = numberOfMatches > 0 ? Math.pow(2, numberOfMatches - 1) : 0;

  cards[cardNumber] = cards[cardNumber] ? newScore : cards[cardNumber];
});

console.log(cards);
