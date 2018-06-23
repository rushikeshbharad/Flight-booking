import {
  isInSameDate,
  isInBetween,
  getStandardDate,
  getStandardTime,
  getFilteredFlights,
  getRandomFlights
} from './helper';
import { expect } from 'chai';
import sinon from 'sinon';
import { environment } from './temp-db/constants';

describe('isInSameDate', () => {
  it('returns false timestamps are in different dates', () => {
    const result = isInSameDate(1529641200, 1556748328);
    expect(result).to.be.eq(false);
  });

  it('returns true when both timestamps are in same day', () => {
    const result = isInSameDate(1529641200, 1529661418);
    expect(result).to.be.eq(true);
  });
});

describe('isInBetween', () => {
  it('returns false when val is lesses than min', () => {
    const result = isInBetween({ val: 352, min: 465, max: 935 });
    expect(result).to.be.eq(false);
  });
  
  it('returns false when val is greater than max', () => {
    const result = isInBetween({ val: 1102, min: 465, max: 935 });
    expect(result).to.be.eq(false);
  });

  it('returns true when val is smaller than max and greater than min', () => {
    const result = isInBetween({ val: 647, min: 465, max: 935 });
    expect(result).to.be.eq(true);
  });
});

describe('getStandardDate', () => {
  it('returns empty string for non-number input', () => {
    const result = getStandardDate("sdgasgha");
    expect(result).to.be.eq('');
  });

  it('returns "22 Jun 2018" for given timestamp', () => {
    const result = getStandardDate(1529641200);
    expect(result).to.be.eq('22 Jun 2018');
  });
});

describe('getStandardTime', () => {
  it('returns empty string for non-number input', () => {
    const result = getStandardTime("sdgasgha");
    expect(result).to.be.eq('');
  });

  it('returns "09:06 AM" for given timestamp', () => {
    const result = getStandardTime(1529641200);
    expect(result).to.be.eq('09:06 AM');
  });
});


describe('getFilteredFlights', () => {
  beforeEach(() => {
	  sinon.stub(environment, 'dev').returns(false);
	  environment.dev = false;
  });

  it('returns empty array if flights are not available', () => {
    const result = getFilteredFlights({
      from: 'Pune',
      to: 'Mumbai',
      departure: 1529464200,
      minPrice: 0,
      maxPrice: 10000
    });
    expect(result).to.have.length(0);
  });

  it('returns array of objects which contain flight details', () => {
    const result = getFilteredFlights({
      from: 'Pune',
      to: 'Delhi',
      departure: 1529464200,
      minPrice: 0,
      maxPrice: 10000
    });
    expect(result).to.have.length(3);
  });

  it('contstrains the result according to price filter', () => {
    const result = getFilteredFlights({
      from: 'Pune',
      to: 'Delhi',
      departure: 1529464200,
      minPrice: 0,
      maxPrice: 8000
    });
    expect(result).to.have.length(1);
  });
});

describe('getRandomFlights', () => {
  it('returns array of flights from db', () => {
    const result = getRandomFlights({ minPrice: 0, maxPrice: 10000 });
    expect(result).to.have.length(3);
  });

  it('returns empty array if price constrain is provided with no window', () => {
    const result = getRandomFlights({ minPrice: 5000, maxPrice: 5000 });
    expect(result).to.have.length(0);
  });
});
