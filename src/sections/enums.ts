import * as ts from "typescript";
import { camelcase } from "varname";
import { Data, Options } from "./types";

const { factory } = ts;

export const defaultKeyGen = (record: Record<string, any>) => {
  if (!("key" in record))
    throw new Error("there is no `key` field in definition record");
  return camelcase(record.key);
};

export const enums = (jsonArray: Record<string, any>[], options: Options) => {
  const { identify } = options;

  const { keys } = jsonArray.reduce<Data>(
    (pre, cur) => {
      return {
        keys: [...pre.keys, defaultKeyGen(cur)],
      };
    },
    { keys: [] }
  );

  return factory.createNodeArray([
    factory.createEnumDeclaration(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(`${identify}_Keys`),
      keys.map((key) => {
        return factory.createEnumMember(
          factory.createIdentifier(key),
          factory.createStringLiteral(key)
        );
      })
    ),
  ]);
};
