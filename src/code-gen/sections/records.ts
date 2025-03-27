import ts from "typescript";
import { Resource } from "../../types";

const { factory } = ts;

export const records = (resource: Resource) => {
  const { identify, valueField } = resource;
  const jsonFile = ts.parseJsonText("", JSON.stringify(resource.records));

  const recordsReadonlyName = `${identify}_records_readonly`;
  const recordsName = `${identify}_records`;
  const recordsTypeName = `${identify}_Records`;

  return factory.createNodeArray([
    factory.createVariableStatement(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(recordsReadonlyName),
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
    factory.createVariableStatement(
      [factory.createToken(ts.SyntaxKind.ExportKeyword)],
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(recordsName),
            undefined,
            undefined,
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier(recordsReadonlyName),
                factory.createIdentifier("concat")
              ),
              undefined,
              []
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
        factory.createIdentifier(recordsReadonlyName),
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
        factory.createLiteralTypeNode(factory.createStringLiteral(valueField))
      )
    ),
  ]);
};
