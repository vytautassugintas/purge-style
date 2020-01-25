const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function findUsedClasses(file) {
  const ast = parse(file, {
    sourceType: "module",
    plugins: ["jsx", "typescript"]
  });

  const usedClasses = [];
  let styleImportName;

  traverse(ast, {
    ImportDeclaration: ({ node: { source, specifiers } }) => {
      if (source.value.includes(".scss")) {
        styleImportName = specifiers.find(
          node => node.type === "ImportDefaultSpecifier"
        ).local.name;
      }
    },
    MemberExpression: ({ node: { object, property } }) => {
      if (object.name === styleImportName) {
        usedClasses.push(property.name);
      }
    }
  });

  return usedClasses;
}

module.exports = {
  findUsedClasses
};
