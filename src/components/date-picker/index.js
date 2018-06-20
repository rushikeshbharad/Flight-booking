import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Datepicker from 'react-datepicker';
import moment from 'moment';
import Styles from './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

classnames.bind(Styles);

const DatePicker = props => {
  // selected props needs moment object
  // while value needs to be a string
  const [selected, value] = moment.isMoment(props.value)
    ? [props.value, props.value.format('DD MMM YYYY')]
    : [moment(), props.value];

  return <Datepicker
    {...props}
    selected={selected}
    onChange={props.handleChange}
    value={value}
  />;
}

DatePicker.propTypes = {
  selected: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handleChange: PropTypes.func
};

export default DatePicker;
