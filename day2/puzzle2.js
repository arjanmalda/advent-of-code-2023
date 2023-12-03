const fs = require("fs")

const fileContent = fs.readFileSync("day2/input.txt");

const fileLines = fileContent.toString().split("\n");

const games = fileLines.map((line) => {
    const [id, game] = line.split(':');
    const sets = game.split(';').map((set) => 
        set.split(',').map((cube) => cube.trim())
    );
    return { id: id.trim(), sets: sets };
});

const accumulatedGames = games
    .filter((game) => {
        const scores = game.sets.map(()=> ({ red: 0, green: 0, blue: 0 }));
       
        game.sets.forEach((set, setIndex) => {
            set.forEach((cube) => {
                const [number, color] = cube.split(' ');
                 scores[setIndex][color] += parseInt(number, 10);
            });
        });


        return scores;
    }).map((game)=> game.sets)


let score = 0;

for (let index = 0; index < accumulatedGames.length; index++) {
    const game = accumulatedGames[index];

    let minimumNeededCubes = {red: 0, green: 0, blue: 0};

    game.forEach((set) => {
        set.forEach((cube) => {
            const [number, color] = cube.split(' ');
            const parsedNumber = parseInt(number, 10);
            minimumNeededCubes[color] = parsedNumber > minimumNeededCubes[color] ? parsedNumber : minimumNeededCubes[color];
        });
    });

    const powerOfMinimumValues = minimumNeededCubes.red * minimumNeededCubes.green * minimumNeededCubes.blue;
   score += powerOfMinimumValues
}

console.log(score);
