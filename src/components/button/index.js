import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Styles from './styles.css';

classnames.bind(Styles);

const Button = props => <button {...props}>{props.text}</button>

Button.propTypes = {
  text: PropTypes.string
};

export default Button;
