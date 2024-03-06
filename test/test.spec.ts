import { expect, it } from "bun:test";
import { codeGen } from "../src/code-gen/generate";
import { defaultKeyGen } from "../src/command-generate/default-key-gen";
import { generate } from "../src";

it("code generate", () => {
  const code = codeGen({
    identify: "TEST",
    valueField: "value",
    keyField: "key",
    keyFormat: "camelcase",
    keyGen: (record) => defaultKeyGen(record, "key", "camelcase"),
    out: "../",
    records: [
      { value: "hello", key: "hello-hello" },
      { value: "world", key: "world-world" },
    ],
    utils: "../",
  });

  expect(code).toMatchSnapshot();
});

it("from folder", async () => {
  await generate({ config: "./test/definition.config.ts" });
});
