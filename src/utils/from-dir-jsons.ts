import { readFileSync, existsSync } from "fs";
import { resolve, relative, parse, join } from "path";
import { ConfigOptions, Resource } from "../types";
import { globSync } from "glob";
import { underscore } from "varname";
import { defaultKeyGen } from "./default-key-gen";

export const fromDirJsons = (config: ConfigOptions): Resource[] => {
  if (!existsSync(config.dir))
    throw new Error(`Directory ${config.dir} is not exist`);

  const pattern = resolve(config.dir, "**/*.json");

  const recordFiles = globSync(pattern);

  const resources: Resource[] = [];

  for (const recordFile of recordFiles) {
    const { name: recordFileName, dir: recordFileDir } = parse(recordFile);

    const records = JSON.parse(readFileSync(recordFile).toString());

    const valueField = config.valueField ?? "value";
    const keyField = config.keyField ?? "key";
    const keyFormat = config.keyFormat ?? "camelcase";

    const out = resolve(
      config.output,
      relative(config.dir, recordFileDir),
      `${recordFileName}.ts`
    );

    const utils = ((): string => {
      const relativePath = relative(
        recordFileDir,
        resolve(config.dir, "utils")
      );
      return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
    })();

    resources.push({
      utils,
      identify: underscore(recordFileName).toUpperCase(),
      out,
      records,
      valueField,
      keyField,
      keyFormat,
      keyGen: (record) => defaultKeyGen(record, keyField, keyFormat),
    });
  }

  return resources;
};
