import ts from "typescript";
import { Resource } from "../../types";

const { factory } = ts;

export const enums = (resource: Resource) => {
  const { identify } = resource;

  const keys = resource.records.reduce<string[]>(
    (pre, cur) => [...pre, resource.keyGen(cur)],
    []
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
