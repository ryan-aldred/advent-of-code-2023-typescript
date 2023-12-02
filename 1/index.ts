// const stream = new ReadableStream('./data.txt');
// const str = await Bun.readableStreamToText(stream);

async function decodeDumbElfShit() {
  const file = Bun.file("./data.txt");
  const text = await file.text();

  const dataArr = text.trim().split("\n");
  let finalValue = 0;

  for (const string of dataArr) {
    const numbersFound = string.match(/[0-9]/g);

    if (!numbersFound) throw new Error("no numbers found");

    const currentNumber = Number(
      numbersFound[0] + numbersFound[numbersFound.length - 1]
    );

    finalValue += currentNumber;
  }

  return finalValue;
}

console.log(await decodeDumbElfShit());
