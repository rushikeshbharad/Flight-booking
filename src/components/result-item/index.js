import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Button from  '../button';
import { getStandardTime } from '../../helper';
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const FlightTimings = ({ isDeparture, flightDetails }) => (
  <div className={cx('flight-timings')}>
    <div className={cx('flight-number')}>{flightDetails['flight-id']}</div>
    <div className={cx('flight-from-to')}>{`${flightDetails.from} - ${flightDetails.to}`}</div>
    <div className={cx('flight-departure-time')}>Departs: {getStandardTime(+flightDetails.departs)}</div>
    <div className={cx('flight-arrival-time')}>Arrives: {getStandardTime(+flightDetails.arrives)}</div>
  </div>
);

FlightTimings.propTypes = {
  isDeparture: PropTypes.bool,
  flightDetails: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    departs: PropTypes.string,
    arrives: PropTypes.string,
  })
};

const ResultItems = ({ upFlight, downFlight }) => (
  <div className={cx('result-item')}>
    <div className={cx('flight-details')}>
      <div className={cx('flight-price')}>Rs. {upFlight && upFlight.fare}</div>
      <div className={cx('flight-details-holder')}>
        <FlightTimings isDeparture flightDetails={upFlight} />
        {downFlight && <FlightTimings flightDetails={downFlight} />}
      </div>
    </div>
    <div className={cx('flight-booking-holder')}>
      <div className={cx('flight-booking-icon')}></div>
      <Button className={cx('book-flight')} text="Book this flight" />
    </div>
  </div>
);

ResultItems.propTypes = {
  upFlight: PropTypes.object,
  downFlight: PropTypes.object
};

export default ResultItems;
