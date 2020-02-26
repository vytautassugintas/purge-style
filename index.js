const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const CSSOM = require("cssom");

function findUsedClasses(file) {
  const ast = babelParser.parse(file, {
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

function findClasses(file) {
  const { cssRules } = CSSOM.parse(file);
  const classes = cssRules.map(rule => rule.selectorText);

  return {
    classes
  };
}

module.exports = {
  findUsedClasses,
  findClasses
};
