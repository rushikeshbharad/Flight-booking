import React, { Component } from 'react';
import classnames from 'classnames/bind';
import moment from 'moment';
import PageHeader from './containers/header';
import SeatchForm from './containers/search-form';
import ResultItems from './containers/result-items';
import { getFilteredFlights, getRandomFlights } from './helper';
import Styles from './App.css';

const cx = classnames.bind(Styles);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      departureDate: '',
      returnDate: '',
      minPrice: 0,
      maxPrice: 10000,
      isReturn: false,
      hasUserSearched: false
    };
  }

  onUpdateSearchData = ({ from, to, departureDate, returnDate, minPrice, maxPrice }) => {
    this.setState({
      from: from && from.value,
      to: to && to.value,
      departureDate: moment.isMoment(departureDate) ? departureDate.unix() : departureDate,
      returnDate: moment.isMoment(returnDate) ? returnDate.unix() : returnDate,
      minPrice,
      maxPrice,
      hasUserSearched: true
    });
  }

  updateReturn = val => {
    this.setState({ isReturn: val });
  }

  render() {
    const { from, to, departureDate, returnDate, minPrice, maxPrice } = this.state;
    const upFlights = from && to
      ? getFilteredFlights({ from, to, departure: departureDate, minPrice, maxPrice })
      : getRandomFlights({ minPrice, maxPrice });
    // Display down flights only if user has searched the flights
    // and also has clicked Return tab
    const downFlights = (
      this.state.isReturn
        && from && to
        && getFilteredFlights({ to: from, from: to, departure: returnDate, minPrice, maxPrice })
      ) || [];

    return (
      <div className={cx('page-holder')}>
        <PageHeader />
        <div className={cx('content-holder')}>
          <SeatchForm updateReturn={this.updateReturn} onUpdateSearchData={this.onUpdateSearchData} />
          <ResultItems
            from={from}
            to={to}
            isReturn={this.state.isReturn}
            upFlights={upFlights}
            downFlights={downFlights}
            departureDate={departureDate}
            returnDate={returnDate}
          />
        </div>
      </div>
    );
  }
}

export default App;
