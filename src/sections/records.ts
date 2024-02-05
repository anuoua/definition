import * as ts from "typescript";
import { Options } from "./types";

const { factory } = ts;

export const records = (arrayJson: Record<string, any>[], options: Options) => {
  const { identify } = options;
  const jsonFile = ts.parseJsonText("", JSON.stringify(arrayJson));

  const recordsName = `${identify}_records`;
  const recordsTypeName = `${identify}_Records`;

  return factory.createNodeArray([
    factory.createVariableStatement(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(recordsName),
            undefined,
            undefined,
            factory.createAsExpression(
              jsonFile.statements[0].expression,
              factory.createTypeReferenceNode(
                factory.createIdentifier("const"),
                undefined
              )
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    ),
    factory.createTypeAliasDeclaration(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(recordsTypeName),
      undefined,
      factory.createTypeQueryNode(
        factory.createIdentifier(recordsName),
        undefined
      )
    ),
    factory.createTypeAliasDeclaration(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(`${identify}_Values`),
      undefined,
      factory.createIndexedAccessTypeNode(
        factory.createIndexedAccessTypeNode(
          factory.createTypeReferenceNode(
            factory.createIdentifier(recordsTypeName),
            undefined
          ),
          factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
        ),
        factory.createLiteralTypeNode(factory.createStringLiteral("value"))
      )
    ),
  ]);
};
