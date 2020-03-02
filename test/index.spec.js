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
import { createFragmentContainer, graphql } from 'react-relay';

import styles from './UploadModalHeader.scss';

type Props = {
    title: string;
};

const TitleComponent: FunctionComponent<Props> = ({ item }) => {
    return (
        <h1 className={styles.title}>{item.title}</h1>
    );
};

export const Title = createFragmentContainer(SwatchSelectorMinimalComponent, {
    item: graphql\`
        fragment Title_item on Item {
            title
        }
    \`,
});
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
