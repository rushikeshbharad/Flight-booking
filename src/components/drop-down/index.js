import React from 'react';
import classnames from 'classnames/bind';
import Dropdown from 'react-dropdown';
import Styles from './styles.css';
import 'react-dropdown/style.css'

classnames.bind(Styles);

const DropDown = props => <Dropdown {...props} />;

export default DropDown;
