import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import DatePicker from './index';

describe('<DatePicker />', () => {
  it('renders with one input text', () => {
    const wrapper = mount(<DatePicker value="Departure date" />);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('opens popover on clicking input text', () => {
    const wrapper = mount(<DatePicker value="Departure date" />);
    wrapper.find('input').simulate('click');
    expect(wrapper.find('.react-datepicker')).to.be.exist;
  });
});
