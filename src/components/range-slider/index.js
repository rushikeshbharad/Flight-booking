import React from 'react';
import classnames from 'classnames/bind';
import { Range } from 'rc-slider';
import Styles from './styles.css';
import 'rc-slider/assets/index.css';

classnames.bind(Styles);

const RangeSlider = props => <Range {...props} />

export default RangeSlider;
