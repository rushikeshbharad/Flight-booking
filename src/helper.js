import moment from 'moment';
import { db as TempDB, environment } from './temp-db/constants';

export const isInSameDate = (timestamp1, timestamp2) => {
  const moment1 = moment(timestamp1 * 1000);
  const moment2 = moment(timestamp2 * 1000);
  return moment1.year() === moment2.year()
    && moment1.month() === moment2.month()
    && moment1.date() === moment2.date();
};

export const isInBetween = ({ val, min, max }) => val > min && val < max;

export const getFilteredFlights = ({ from, to, departure, minPrice, maxPrice }) => {
  if (environment.dev) {
    return getRandomFlights({ minPrice, maxPrice });
  }

  return TempDB.filter(flight => {
	  return flight.from.toLocaleLowerCase() === from.toLocaleLowerCase()
		  && flight.to.toLocaleLowerCase() === to.toLocaleLowerCase()
		  && isInSameDate(flight.departs, departure)
		  && isInBetween({ val: flight.fare, min: minPrice, max: maxPrice });
  });
}

export const getRandomFlights = ({ minPrice, maxPrice }) => {
  const totalFlights = TempDB.length;
  return [1, 2, 3]
    .map(() => TempDB[Math.floor(Math.random() * totalFlights)])
    .filter(flight => isInBetween({ val: flight.fare, min: minPrice, max: maxPrice }));
}

export const getStandardDate = timestamp => {
  if (Number.isInteger(timestamp)) {
    return moment(timestamp * 1000).format('DD MMM YYYY');
  }

  return '';
};

export const getStandardTime = timestamp => {
  if (Number.isInteger(timestamp)) {
    return moment(timestamp * 1000).format('HH:MM A');
  }

  return '';
};
