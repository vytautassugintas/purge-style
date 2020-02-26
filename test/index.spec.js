const { findUsedClasses, findClasses, findUnusedClasses } = require("../index");

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

describe("purge-style", () => {
  it("should find used classes", () => {
    const { usedClasses } = findUsedClasses(file);
    expect(usedClasses).toEqual(["title"]);
  });
  it("should find classnames in style file", () => {
    const { classes } = findClasses(style);
    expect(classes).toEqual([".title", ".header"]);
  });
  it("should find unused classes", () => {
    const { classes } = findClasses(style);
    const { usedClasses } = findUsedClasses(file);
    const { unusedClasses } = findUnusedClasses({ classes, usedClasses });
    expect(unusedClasses).toEqual(["header"]);
  });
});
