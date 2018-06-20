import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { getStandardDate } from '../../helper';
import FlightDetails from '../../components/result-item';
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const ResultItems = props => {
  let { upFlights, downFlights, isReturn, from, to, departureDate, returnDate } = props;
  from = from || "From";
  to = to || "To";
  upFlights = upFlights || [];
  downFlights = downFlights || [];

  if (!upFlights.length) {
    return (
      <div className={cx("result-items-container")}>
        <div className={cx('no-flight-found')}>Sorry, no flight found</div>
      </div>
    );
  }

  return (
    <div className={cx("result-items-container")}>
      <div className={cx('flight-search-details')}>
        <div className={cx('flight-search-title')}>
          {isReturn ? `${from} > ${to} > ${from}` : `${from} > ${to}`}
        </div>
        <div className={cx('flight-search-dates')}>
          <div className={cx('flight-search-depart-date')}>Depart: {getStandardDate(departureDate)}</div>
          {isReturn && <div className={cx('flight-search-return-date')}>Return: {getStandardDate(returnDate)}</div>}
        </div>
      </div>
      {upFlights.map((flight, i) => <FlightDetails key={i} upFlight={upFlights[i]} downFlight={downFlights[i]} />)}
    </div>
  );
}

ResultItems.propTypes = {
  upFlights: PropTypes.array,
  downFlights: PropTypes.array,
  isReturn: PropTypes.bool,
  from: PropTypes.string,
  to: PropTypes.string,
  departureDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  returnDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ResultItems;
