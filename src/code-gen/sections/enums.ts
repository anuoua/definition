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
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(identify + "_Keys"),
          undefined,
          undefined,
          factory.createAsExpression(
            factory.createObjectLiteralExpression(
              keys.map((key) =>
                factory.createPropertyAssignment(
                  factory.createIdentifier(key),
                  factory.createStringLiteral(key)
                )
              ),
              true
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
};
