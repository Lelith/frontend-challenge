import '../jest-setup';

import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('Renders an HomePage with a Link to CalendarPage', async () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <App />
    </MemoryRouter>,
  );
  const calendarLink = <a href="/calendar">get started</a>;
  // Calendar link is rendered
  expect(wrapper.contains(calendarLink)).toEqual(true);
});

it('Should redirect to 404 when path is invalid', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/random']} initialIndex={0}>
      <App />
    </MemoryRouter>,
  );

  const ErrorTitle = <h1>Error</h1>;
  // Calendar link is rendered
  expect(wrapper.contains(ErrorTitle)).toEqual(true);
});
