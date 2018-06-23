import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import DropDown from './index';

describe('<DropDown />', () => {
  it('renders with given text', () => {
    const wrapper = render(<DropDown options={['one', 'two', 'three', 'four']} value="one" />);
    expect(wrapper.find('.Dropdown-placeholder')).to.have.length(1);
  });
});
