import React from 'react';
import { expect } from 'chai';
import { mount, render } from 'enzyme';
import RangeSlider from './index';

describe('<RangeSlider />', () => {
  it('renders with 2 knobs', () => {
    const wrapper = render(<RangeSlider
        min={0}
        max={10000}
        value={[1000, 9000]}
    />);
    expect(wrapper.find('.rc-slider-handle')).to.have.length(2);
  });
  
  it('renders with rc-slider class', () => {
    const wrapper = mount(<RangeSlider
      min={0}
      max={10000}
      value={[1000, 9000]}
    />);
    expect(wrapper.find('.rc-slider')).to.have.length(1);
  });
});
