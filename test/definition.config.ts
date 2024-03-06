import { ConfigOptions } from "../src";

export default (): ConfigOptions => {
  return {
    dir: "./test/def-records",
    output: "./test/def-types",
    keyFormat: "underscore",
  };
};
