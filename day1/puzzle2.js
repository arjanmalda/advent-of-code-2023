const fs = require("fs");

const fileContent = fs.readFileSync("day1/input2.txt");

const fileContentAsArray = fileContent?.toString().split("\n");

const numbersAsString = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let score = 0;

for (let index = 0; index < fileContentAsArray.length; index++) {
  const element = fileContentAsArray[index];

  const numbersAsArray = element.match(
    /zero|one|two|three|four|five|six|seven|eight|nine|\d/g
  );

  const reversedNumbersAsArray = getReverseString(element).match(
    /orez|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d/g
  );

  const firstNumber = numbersAsString.includes(numbersAsArray[0])
    ? numbersAsString.findIndex(
        (numberAsString) => numberAsString === numbersAsArray[0]
      )
    : numbersAsArray[0];

  const lastNumber = numbersAsString.includes(
    getReverseString(reversedNumbersAsArray[0])
  )
    ? numbersAsString.findIndex(
        (numberAsString) =>
          numberAsString === getReverseString(reversedNumbersAsArray[0])
      )
    : getReverseString(reversedNumbersAsArray[0]);

  combinedValue = +`${firstNumber}${lastNumber}`;

  score += combinedValue;
}

console.log(score);

function getReverseString(string) {
  return string.split("").reverse().join("");
}
