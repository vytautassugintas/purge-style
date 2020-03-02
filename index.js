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
    ImportDeclaration: path => {
      if (path.node.source.value.includes(".scss")) {
        path.traverse({
          ImportDefaultSpecifier: path => {
            styleImportName = path.node.local.name;
          }
        });
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

  return { classes };
}

function findUnusedClasses({ classes, usedClasses }) {
  const classNames = classes.map(claz =>
    claz.charAt(0) === "." ? claz.slice(1) : claz
  );

  const unusedClasses = classNames
    .filter(c => !usedClasses.includes(c))
    .concat(usedClasses.filter(c => !classNames.includes(c)));

  return { unusedClasses };
}

module.exports = {
  findUsedClasses,
  findClasses,
  findUnusedClasses
};
