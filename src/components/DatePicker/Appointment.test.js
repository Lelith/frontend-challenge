import '../../../jest-setup';

import React from 'react';
import { shallow } from 'enzyme';

import Appointment from './Appointment';

it('Should set dates which don t contain timeslots to disabled', () => {
  const myFunction = () => {};
  const appointmentIndex = 1;
  const appointment = {
    date: '2018-08-14',
    slots: [],
  };

  const wrapper = shallow(
    <Appointment
      chooseTime={myFunction}
      toggleActiveDate={myFunction}
      appointment={appointment}
      appointmentIndex={appointmentIndex}
    />,
  );
  expect(wrapper.html()).toMatch(/.disabled/);
});

it('Should render the list of available timeslots when set to active', () => {
  const myFunction = () => {};
  const appointmentIndex = 1;
  const appointment = {
    date: '2018-08-16',
    slots: [
      { start: '8:00', end: '8:15' },
      { start: '8:20', end: '8:35' },
    ],
  };

  const wrapper = shallow(
    <Appointment
      chooseTime={myFunction}
      toggleActiveDate={myFunction}
      appointment={appointment}
      appointmentIndex={appointmentIndex}
      active
    />,
  );
  expect(wrapper.html()).toMatch(/.availableSlots/);
});
