import ts from "typescript";
import { Resource } from "../../types";

const { factory } = ts;

export const imports = (resource: Resource) => {
  return factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier("krMap")
        ),
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier("vrMap")
        ),
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier("kvMap")
        ),
      ])
    ),
    factory.createStringLiteral(resource.utils),
    undefined
  );
};
