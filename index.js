const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function createAST(source) {
  return parse(source, {
    sourceType: "module",
    plugins: ["jsx", "typescript"]
  });
}

function traverseAST(ast, indentifiers = {}) {
  return traverse(ast, {
    ...indentifiers
  });
}

module.exports = {
  createAST,
  traverseAST
};
