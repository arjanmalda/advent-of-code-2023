const fs = require("fs");

const fileContent = fs.readFileSync("day5/input.txt");

const fileContentAsArray = fileContent?.toString().split("\n\n");

const seeds = fileContentAsArray[0]
  .split(":")[1]
  .trim(" ")
  .split(" ")
  .map((seed) => Number.parseInt(seed, 10));

const maps = {
  seedToSoilMap: fileContentAsArray[1]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((item) => Number.parseInt(item, 10))),
  soilToFertilizerMap: fileContentAsArray[2]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((item) => Number.parseInt(item, 10))),
  fertilizerToWaterMap: fileContentAsArray[3]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((item) => Number.parseInt(item, 10))),
  waterToLightMap: fileContentAsArray[4]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((item) => Number.parseInt(item, 10))),
  lightToTemperatureMap: fileContentAsArray[5]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((item) => Number.parseInt(item, 10))),
  temperatureToHumidityMap: fileContentAsArray[6]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((item) => Number.parseInt(item, 10))),
  humidityToLocationMap: fileContentAsArray[7]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((item) => Number.parseInt(item, 10))),
};

Object.keys(maps).forEach((mapKey) => {
  const map = maps[mapKey];
  map.forEach((line, lineIndex) => {
    const [destinationRangeStart, sourceRangeStart, rangeLenth] = line;

    const sourceRange = [sourceRangeStart];
    const destinationRange = [destinationRangeStart];
    let index = 0;
    while (index < rangeLenth) {
      sourceRange.push(sourceRangeStart + index);
      destinationRange.push(destinationRangeStart + index);
      index++;
    }
    seeds.forEach((seed, seedIndex) => {
      if (sourceRange.includes(seed)) {
        const sourceRangeIndex = sourceRange.indexOf(seed);
        seeds[seedIndex] = destinationRange[sourceRangeIndex];
      }
    });
  });
});

const smallesSeed = Math.min(...seeds);
console.log(smallesSeed);
