const { createAST, traverseAST } = require("../index");

const style = `
.title {
    color: #ddd
    font-size: 18px;
}

.header {
    color: #ccc
    font-size: 24px;
}`;

const file = `
import React, { FunctionComponent } from 'react';

import styles from './UploadModalHeader.scss';

type Props = {
    title: string;
};

export const Title: FunctionComponent<Props> = ({ title }) => {
    return (
        <h1 className={styles.title}>{title}</h1>
    );
};
`;

const ast = createAST(file);

describe("createAST", () => {
  it("it just should work", () => {
    expect(ast.type).toEqual("File");
  });
});

describe("traverse", () => {
  it("find used classes", () => {
    const usedClasses = [];
    let styleImportName;
    traverseAST(ast, {
      ImportDeclaration: ({ node: { source, specifiers } }) => {
        // console.log(source.value);
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
    expect(usedClasses).toEqual(["title"]);
  });
});
