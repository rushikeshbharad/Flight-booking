import React from 'react';
import classnames from 'classnames/bind';
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const PageHeader = () => (
  <div className={cx("page-header")}>
    Flight Search Engine
  </div>
);

export default PageHeader;
