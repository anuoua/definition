import * as ts from "typescript";
import { records } from "./sections/records";
import { enums } from "./sections/enums";
import { maps } from "./sections/maps";
import { Options } from "./sections/types";

const { factory } = ts;

export const generate = (data: Record<string, any>[], options: Options) => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const recordsAst = records(data, options);

  const enumsAst = enums(data, options);

  const mapsAst = maps(data, options);

  const astList = factory.createNodeArray(
    [recordsAst, enumsAst, mapsAst].flat()
  );

  const sourceFile = factory.createSourceFile(
    astList,
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
  );

  return printer.printFile(sourceFile);
};

const data = [
  {
    key: "k-1",
    value: "value-1",
  },
  {
    key: "k-2",
    value: "value-3",
  },
];

const options: Options = {
  identify: "TEST",
};

console.log(generate(data, options));
