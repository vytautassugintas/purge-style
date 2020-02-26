const { findUsedClasses } = require("../index");

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
    expect(findUsedClasses(file)).toEqual({ usedClasses: ["title"] });
  });
});
