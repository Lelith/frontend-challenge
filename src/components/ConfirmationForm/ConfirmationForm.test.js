import '../../../jest-setup';

import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import ConfirmationForm from './ConfirmationForm';

describe('ConfirmationForm component', () => {
  it('Renders a form with initial state isValid true and getCall to equal false', () => {
    const wrapper = shallow(<ConfirmationForm />);
    expect(wrapper.state('isValid')).toEqual(true);
    expect(wrapper.state('getCall')).toEqual(false);
  });

  it('It changes the states and renders the date picker when checkbox is checked', () => {
    const wrapper = shallow(<ConfirmationForm />);

    // set checkbox to true
    wrapper.find('Switch[type="checkbox"]').simulate('change', { target: { checked: true } });

    // state should change
    expect(wrapper.state('isValid')).toEqual(false);
    expect(wrapper.state('getCall')).toEqual(true);

    // DatePicker is rendered
    const DatePicker = wrapper.find('DatePicker');

    assert.equal(DatePicker.length, 1);
  });
});
