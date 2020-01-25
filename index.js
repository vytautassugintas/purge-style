function createAST(source) {
  return require("@babel/parser").parse(source, {
    sourceType: "module",
    plugins: ["jsx", "typescript"]
  });
}

module.exports = {
  createAST
};
