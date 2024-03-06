import { program } from "commander";
import { GenerateOptions, generate } from "./command-generate/action";

program
  .command("generate")
  .alias("g")
  .option("-c, --config [path]", "Config file path")
  .action((options: GenerateOptions) => generate(options));

program.parse();

if (process.argv.length === 2) {
  process.argv.push("-h");
}
