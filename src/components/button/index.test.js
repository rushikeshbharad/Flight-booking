import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Button from './index';

describe('<Button />', () => {
  it('renders with given text', () => {
    const wrapper = shallow(<Button text="Click me" />);
    expect(wrapper.text()).to.eq('Click me');
  });
});
