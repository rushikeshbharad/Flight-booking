import React from 'react';
import { expect } from 'chai';
import { mount, render } from 'enzyme';
import SearchForm from './index';
import DatePicker from '../../components/date-picker';
import { wrap } from 'module';

describe('<SearchForm />', () => {
  it('renders with fligth date picker if isReturn is true', () => {
    const wrapper = mount(<SearchForm />);
    wrapper.setState({ isReturn: true });
    expect(wrapper.find(DatePicker)).to.have.length(2);
  });

  it('renders only departure date picker if isReturn state is false', () => {
    const wrapper = mount(<SearchForm />);
    wrapper.setState({ isReturn: false });
    expect(wrapper.find(DatePicker)).to.have.length(1);
  });
});
