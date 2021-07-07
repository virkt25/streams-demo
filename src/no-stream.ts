import { readFile } from "fs/promises";
import { DataType } from "./create.data.file";

export async function sumData(file: string) {
  const fileContents = await readFile(file, { encoding: "utf-8" });
  const data: DataType[] = JSON.parse(fileContents);

  let sum = 0;
  data.forEach((d) => (sum += d.amountCents));

  console.log(`The sum of ${data.length} rows is ${sum}`);

  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
}

sumData("data.json");
