import { cwd } from "process";
import { resolve, dirname, parse } from "path";
import { fileURLToPath } from "url";
import { existsSync, writeFileSync, mkdirSync, cpSync } from "fs";
// import { loadTsConfig } from "config-file-ts";
import { ConfigOptions } from "./types";
import { fromDirJsons } from "./utils/from-dir-jsons";
import { codeGen } from "./code-gen/generate";

const resolvePath = (name: string) => resolve(cwd(), name);

const getConfig = async (config?: string) => {
  const paths = [
    resolvePath("definition.config.mjs"),
    resolvePath("definition.config.cjs"),
    // resolvePath("definition.config.ts"),
  ];

  const configPath = config
    ? existsSync(resolvePath(config))
      ? resolvePath(config)
      : undefined
    : await (async () => {
        for (let item of paths) {
          if (existsSync(item)) return item;
        }
      })();

  if (!configPath) throw new Error("Config file is not exist");

  const model = await import(`file://${configPath}`);
  return (await model.default()) as ConfigOptions;

  // if (configPath.endsWith(".mjs") || configPath.endsWith(".cjs")) {
  //   const model = await import(configPath);
  //   return (await model.default()) as ConfigOptions;
  // } else {
  //   const config = loadTsConfig<() => Promise<ConfigOptions>>(configPath)!;
  //   return await config();
  // }
};

export interface GenerateOptions {
  config?: string;
}

export const generate = async (options: GenerateOptions) => {
  const config = await getConfig(options.config);

  const resources = fromDirJsons(config);

  for (let resource of resources) {
    const outDir = dirname(resource.out);

    const code = codeGen(resource);

    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    writeFileSync(resource.out, code);
  }

  const { dir } = parse(fileURLToPath(import.meta.url));

  const utilsPath = resolve(dir, "../utils");

  cpSync(utilsPath, resolve(config.output, "utils"), {
    recursive: true,
  });
};
