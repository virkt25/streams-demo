import { pipeline, Transform, TransformCallback, Writable } from "stream";
import { promisify } from "util";
import * as JSONStream from "JSONStream";
import { createReadStream } from "fs";
import { DataType } from "./create.data.file";

export const pipelineAsync = promisify(pipeline);

export async function sumData(file: string) {
  const readStream = createReadStream(file, {
    encoding: "utf8",
  });
  const parseStream = JSONStream.parse("*");
  const sumStream = new SumStream();
  const nullStream = new NullStream();

  console.log("starting pipeline...");

  await pipelineAsync(readStream, parseStream, sumStream, nullStream);

  console.log(`The sum of ${sumStream.count} rows is ${sumStream.sum}`);

  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
}

export class SumStream extends Transform {
  public sum = 0;
  public count = 0;

  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk: DataType, _encoding: string, cb: TransformCallback) {
    this.count++;
    this.sum += chunk.amountCents;

    cb(null, chunk);
  }
}

export class NullStream extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  _write(_chunk: any, _encoding: any, cb: TransformCallback) {
    cb();
  }
}

sumData("data.json");
