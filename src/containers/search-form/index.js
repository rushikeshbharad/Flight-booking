import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import moment from 'moment';
import DatePicker from '../../components/date-picker';
import DropDown from '../../components/drop-down';
import Button from '../../components/button';
import RangeSlider from '../../components/range-slider';
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const passangerOptions = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

class SearchForm extends Component {
  static propTypes = {
    onUpdateSearchData: PropTypes.func,
    updateReturn: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isReturn: false,
      departureDate: moment(),
      returnDate: moment(),
      minPrice: 0,
      maxPrice: 10000,
      passangerOption: passangerOptions[0]
    };
  }

  departureDateChange = date => {
    this.setState({
      departureDate: date
    });
  }

  returnDateChange = date => {
    this.setState({
      returnDate: date
    });
  }

  changePassangerCount = passangerOption => {
    this.setState({ passangerOption });
  }

  onSliderValueChange = ([minPrice, maxPrice]) => {
    const { from, to } = this;
    const { departureDate, returnDate } = this.state;
    this.setState({ minPrice, maxPrice });
    this.props.onUpdateSearchData({ from, to, departureDate, returnDate, minPrice, maxPrice });
  }

  searchFlights = () => {
    const { from, to } = this;
    const { departureDate, returnDate, minPrice, maxPrice } = this.state;
    this.props.onUpdateSearchData({ from, to, departureDate, returnDate, minPrice, maxPrice });
  }

  render() {
    const returnDate = 
      moment.isMoment(this.state.returnDate)
      && moment.isMoment(this.state.departureDate)
      && this.state.returnDate.unix() < this.state.departureDate.unix()
        ? this.state.departureDate
        : this.state.returnDate;

    return (
      <div className={cx('search-form-container')}>
        <div className={cx('flight-type-selector')}>
          <div
            className={cx('flight-type-tab', !this.state.isReturn && 'selected-tab')}
            onClick={() => {
              this.setState({ isReturn: false });
              this.props.updateReturn(false);
            }}
          >
            One way
          </div>
          <div
            className={cx('flight-type-tab', this.state.isReturn && 'selected-tab')}
            onClick={() => {
              this.setState({ isReturn: true });
              this.props.updateReturn(true);
            }}
          >
            Return
          </div>
        </div>
        <div className={cx('search-parameters-container')}>
          <input
            ref={from => {this.from = from}}
            placeholder="Enter Origin City"
          />
          <input
            ref={to => {this.to = to}}
            placeholder="Enter Destination City"
          />
          <DatePicker
            value={this.state.departureDate}
            handleChange={this.departureDateChange}
            minDate={moment()}
          />
          {this.state.isReturn && <DatePicker
            value={returnDate}
            handleChange={this.returnDateChange}
            minDate={moment.isMoment(this.state.departureDate) ? this.state.departureDate : moment()}
          />}
          <DropDown
            options={passangerOptions}
            value={this.state.passangerOption}
            onChange={this.changePassangerCount}
          />
          <Button
            text="Search"
            onClick={this.searchFlights}
          />
        </div>
        <div className={cx('price-range-holder')}>
          <div className={cx('price-range-title')}>Refine flight search</div>
          <RangeSlider
            min={0}
            max={10000}
            step={500}
            value={[this.state.minPrice, this.state.maxPrice]}
            onChange={this.onSliderValueChange}
            pushable={true}
          />
          <div className={cx('price-range-numbers')}>Range: {this.state.minPrice} to {this.state.maxPrice}</div>
        </div>
      </div>
    );
  }
}

export default SearchForm;
