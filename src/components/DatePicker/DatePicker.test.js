import '../../../jest-setup';

import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import DatePicker from './DatePicker';

describe('DatePicker component', () => {
  it('Should show the <Appointment /> component when it has fetched the Data', () => {
    const chooseTime = () => {};
    const wrapper = shallow(<DatePicker chooseTime={chooseTime} />);
    const appointments = [
      {
        date: '2018-08-14',
        slots: [],
      },
      {
        date: '2018-08-16',
        slots: [
          { start: '8:00', end: '8:15' },
          { start: '8:20', end: '8:35' },
        ],
      },
    ];
    wrapper.setState({ appointments });
    wrapper.setState({ isLoading: false });

    const Appointment = wrapper.find('Appointment');

    assert.equal(Appointment.length, 2);
  });
});
