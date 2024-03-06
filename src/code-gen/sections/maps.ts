import ts from "typescript";
import { Resource } from "../../types";

const { factory } = ts;

export const maps = (resource: Resource) => {
  const { identify, valueField } = resource;

  const recordsName = `${identify}_records`;
  const keysTypeName = `${identify}_Keys`;
  const keyListName = `${identify}_key_list`;

  const keys = resource.records.reduce<string[]>(
    (pre, cur) => [...pre, resource.keyGen(cur)],
    []
  );

  const keyArray = factory.createVariableStatement(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(keyListName),
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

  const createDeclear = (name: string, valueField?: string) => {
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
                factory.createIdentifier(keyListName),
                ...(valueField
                  ? [factory.createStringLiteral(valueField)]
                  : []),
              ]
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    );
  };

  const krDeclear = createDeclear("kr");

  const kvDeclear = createDeclear("kv", valueField);

  const vrDeclear = createDeclear("vr", valueField);

  return factory.createNodeArray([keyArray, krDeclear, vrDeclear, kvDeclear]);
};
