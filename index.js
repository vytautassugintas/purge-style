const STARTS_WITH_DOT_REGEX = /[.]\w*/g;
const DOT_REGEX = /[.]/g;
const USED_STYLE_REGEX = /styles[.](\w*)/g;
const STYLE_REGEX = /styles[.]/g;

function getLines(source) {
  return source.split(/\r?\n/);
}

function findAllClassesInStyleFile(styleFile) {
  const lines = getLines(styleFile);
  const classes = [];

  for (line of lines) {
    if (!line.startsWith(".")) {
      continue;
    }

    classes.push(line.match(STARTS_WITH_DOT_REGEX)[0].replace(DOT_REGEX, ""));
  }

  return classes;
}

function findUsedClassesInSourceFile(sourceFile) {
  const lines = getLines(sourceFile);
  const usedClasses = [];

  for (line of lines) {
    if (USED_STYLE_REGEX.test(line)) {
      usedClasses.push(
        line.match(USED_STYLE_REGEX)[0].replace(STYLE_REGEX, "")
      );
    }
  }

  return usedClasses;
}

module.exports = {
  findAllClassesInStyleFile,
  findUsedClassesInSourceFile
};
