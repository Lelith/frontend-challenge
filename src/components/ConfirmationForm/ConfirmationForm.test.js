import '../../../jest-setup';

import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import ConfirmationForm from './ConfirmationForm';

describe('ConfirmationForm component', () => {
  const wrapper = shallow(<ConfirmationForm />);

  it('Renders a form with initial state isValid true and getCall to equal false', () => {
    expect(wrapper.state('isValid')).toEqual(true);
    expect(wrapper.state('getCall')).toEqual(false);
  });

  it('Changes the states and renders the date picker when checkbox is checked', () => {
    // set checkbox to true
    wrapper.find('Switch[type="checkbox"]').simulate('change', { target: { checked: true } });

    // state should change
    expect(wrapper.state('isValid')).toEqual(false);
    expect(wrapper.state('getCall')).toEqual(true);

    // DatePicker is rendered
    const DatePicker = wrapper.find('DatePicker');

    assert.equal(DatePicker.length, 1);
  });

  it('Deletes uneded information when getCall checkbox is un-checked', () => {
    wrapper.setState({
      phone: '+2345',
      date: '2018-08-16',
      slot: '08:00',
      getCall: true,
    });

    expect(wrapper.state('phone')).toEqual('+2345');

    // set checkbox to true
    wrapper.find('Switch[type="checkbox"]').simulate('change', { target: { checked: false } });

    // state should change
    expect(wrapper.state('getCall')).toEqual(false);
    expect(wrapper.state('isValid')).toEqual(true);

    // DatePicker is not rendered
    const DatePicker = wrapper.find('DatePicker');
    assert.equal(DatePicker.length, 0);

    // phone and timeslot are deleted
    expect(wrapper.state('phone', 'date', 'slot')).toEqual(null);
  });

  it('Sets isValid to true when all required fields are not empty', () => {
    wrapper.setState({
      phone: '+2345',
      date: '2018-08-16',
      slot: '08:00',
      getCall: true,
    });
    wrapper.instance().validateForm();
    expect(wrapper.state('isValid')).toEqual(true);
  });
});
