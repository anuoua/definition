import ts from "typescript";
import { Resource } from "../../types";

const { factory } = ts;

export const enums = (resource: Resource) => {
  const { identify } = resource;

  const keys = resource.records.reduce<string[]>(
    (pre, cur) => [...pre, resource.keyGen(cur)],
    []
  );

  return factory.createVariableStatement(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier("TEST_keys"),
        undefined,
        undefined,
        factory.createObjectLiteralExpression(
          keys.map(key => (
            factory.createPropertyAssignment(
              factory.createIdentifier(key),
              factory.createStringLiteral(key)
            )
          )),
          true
        )
      )],
      ts.NodeFlags.Const | ts.NodeFlags.Constant | ts.NodeFlags.Constant
    )
  );
};
