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
  const updated = new Array(seeds.length).fill(false);

  map.forEach((line) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line;

    seeds.forEach((seed, seedIndex) => {
      if (
        !updated[seedIndex] &&
        seed >= sourceRangeStart &&
        seed < sourceRangeStart + rangeLength
      ) {
        const offset = seed - sourceRangeStart;
        seeds[seedIndex] = destinationRangeStart + offset;
        updated[seedIndex] = true;
      }
    });
  });
});

const smallestSeed = Math.min(...seeds);
console.log(smallestSeed);
