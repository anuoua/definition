import * as ts from "typescript";
import { defaultKeyGen } from "./enums";
import { Data, Options } from "./types";

const { factory } = ts;

export const maps = (records: Record<string, any>[], options: Options) => {
  const { identify } = options;

  const recordsName = `${identify}_records`;
  const keysTypeName = `${identify}_Keys`;
  const keysName = `${identify}_keys`;

  const { keys } = records.reduce<Data>(
    (pre, cur) => {
      return {
        keys: [...pre.keys, defaultKeyGen(cur)],
      };
    },
    { keys: [] }
  );

  const keyArray = factory.createVariableStatement(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(`${identify}_keys`),
          undefined,
          undefined,
          factory.createAsExpression(
            factory.createArrayLiteralExpression(
              keys.map((item) =>
                factory.createPropertyAccessExpression(
                  factory.createIdentifier(keysTypeName),
                  factory.createIdentifier(item)
                )
              ),
              false
            ),
            factory.createTypeReferenceNode(
              factory.createIdentifier("const"),
              undefined
            )
          )
        ),
      ],
      ts.NodeFlags.Const
    )
  );

  const createDeclear = (name: string) => {
    const callName = `${identify}_${name}`;
    return factory.createVariableStatement(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(callName),
            undefined,
            undefined,
            factory.createCallExpression(
              factory.createIdentifier(`${name}Map`),
              undefined,
              [
                factory.createIdentifier(recordsName),
                factory.createIdentifier(keysName),
              ]
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    );
  };

  const krDeclear = createDeclear("kr");

  const kvDeclear = createDeclear("kv");

  const vrDeclear = createDeclear("vr");

  return factory.createNodeArray([keyArray, krDeclear, vrDeclear, kvDeclear]);
};
