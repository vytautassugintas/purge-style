const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function findUsedClasses(file) {
  const ast = parse(file, {
    sourceType: "module",
    plugins: ["jsx", "typescript"]
  });

  let styleImportName;
  let usedClasses = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      const { source, specifiers } = node;
      if (source.value.includes(".scss")) {
        styleImportName = specifiers.find(
          ({ type }) => type === "ImportDefaultSpecifier"
        ).local.name;
      }
    },
    MemberExpression: ({ node: { object, property }, ...rest }) => {
      if (object.name === styleImportName) {
        usedClasses = [...usedClasses, property.name];
      }
    }
  });

  return { usedClasses };
}

module.exports = {
  findUsedClasses
};
