import ts from "typescript";
import { records } from "./sections/records";
import { enums } from "./sections/enums";
import { maps } from "./sections/maps";
import { imports } from "./sections/imports";
import { Resource } from "../types";

const { factory } = ts;

export const codeGen = (resource: Resource) => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const importsAst = imports(resource);

  const recordsAst = records(resource);

  const enumsAst = enums(resource);

  const mapsAst = maps(resource);

  const astList = factory.createNodeArray(
    [importsAst, recordsAst, enumsAst, mapsAst].flat()
  );

  const sourceFile = factory.createSourceFile(
    astList,
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
  );

  return printer.printFile(sourceFile);
};
