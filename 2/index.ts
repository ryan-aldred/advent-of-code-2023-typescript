interface GameConditions {
  red: number;
  blue: number;
  green: number;
}

const gameConditions: GameConditions = {
  red: 12,
  green: 13,
  blue: 14,
};

async function getGameResults(gameConditions: GameConditions) {
  const file = Bun.file("./data.txt");
  const text = await file.text();
  const rawGameResults = text.trim().split("\n");
  let runningTotal = 0;

  for (const game of rawGameResults) {
    const gameParts = game.split(": ");
    const gameNumber = Number(gameParts[0].match(/\d+/));
    const gameResults = gameParts[1].split("; ");

    const redArr: number[] = [];
    const greenArr: number[] = [];
    const blueArr: number[] = [];

    for (const gameResult of gameResults) {
      const blueRegex = /(\d+)\s+blue/g;
      const redRegex = /(\d+)\s+red/g;
      const greenRegex = /(\d+)\s+green/g;

      [
        { regex: blueRegex, color: blueArr },
        { regex: redRegex, color: redArr },
        { regex: greenRegex, color: greenArr },
      ].map(({ regex, color }) => {
        const result = regex.exec(gameResult);

        if (!result) return;

        color.push(Number(result[1]));
      });
    }

    if (
      Math.max(...redArr) > gameConditions.red ||
      Math.max(...blueArr) > gameConditions.blue ||
      Math.max(...greenArr) > gameConditions.green
    ) {
      continue;
    }

    runningTotal += gameNumber;
  }
  return runningTotal;
}

console.log(await getGameResults(gameConditions)); // 2551

async function calcMinCubesForGames() {
  const file = Bun.file("./data.txt");
  const text = await file.text();
  const rawGameResults = text.trim().split("\n");
  let runningTotal = 0;

  for (const game of rawGameResults) {
    const gameParts = game.split(": ");
    const gameResults = gameParts[1].split("; ");
    const redArr: number[] = [];
    const greenArr: number[] = [];
    const blueArr: number[] = [];

    for (const gameResult of gameResults) {
      const blueRegex = /(\d+)\s+blue/g;
      const redRegex = /(\d+)\s+red/g;
      const greenRegex = /(\d+)\s+green/g;

      [
        { regex: blueRegex, color: blueArr },
        { regex: redRegex, color: redArr },
        { regex: greenRegex, color: greenArr },
      ].map(({ regex, color }) => {
        const result = regex.exec(gameResult);

        if (!result) return;

        color.push(Number(result[1]));
      });
    }

    const powerOfCube =
      Math.max(...redArr) * Math.max(...greenArr) * Math.max(...blueArr);

    runningTotal += powerOfCube;
  }
  return runningTotal;
}

console.log(await calcMinCubesForGames()); // 62811
