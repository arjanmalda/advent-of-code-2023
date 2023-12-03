const fs = require("fs")

const fileContent = fs.readFileSync("day2/input1.txt");

const maxScores = {
    red: 12,
    green: 13,
    blue: 14
};

const fileLines = fileContent.toString().split("\n");

const games = fileLines.map((line) => {
    const [id, game] = line.split(':');
    const sets = game.split(';').map((set) => 
        set.split(',').map((cube) => cube.trim())
    );
    return { id: id.trim(), sets: sets };
});

const possibleGameIds = games
    .filter((game) => {
        const scores = game.sets.map(()=> ({ red: 0, green: 0, blue: 0 }))
        game.sets.forEach((set, setIndex) => {
            set.forEach((cube) => {
                const [number, color] = cube.split(' ');
                 scores[setIndex][color] += parseInt(number, 10);
            });
        });


        return scores.every((score)=>  Object.keys(maxScores).every((color) => score[color] <= maxScores[color]))
    })
    .map((game) => game.id); 


    const sumOfGameIds = possibleGameIds
    .map(id => parseInt(id.replace(/[^\d]/g, ''), 10)) .reduce((sum, current) => sum + current, 0);

console.log(possibleGameIds, sumOfGameIds);
