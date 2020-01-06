const STARTS_WITH_DOT_REGEX = /[.]\w*/g;
const DOT_REGEX = /[.]/g;

function findAllClassesInStyleFile(styleFile) {
  const lines = styleFile.split(/\r?\n/);
  const classes = [];

  for (line of lines) {
    if (!line.startsWith(".")) {
      continue;
    }

    classes.push(line.match(STARTS_WITH_DOT_REGEX)[0].replace(DOT_REGEX, ""));
  }

  return classes;
}

module.exports = {
  findAllClassesInStyleFile
};
