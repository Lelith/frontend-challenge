import React, { Component } from 'react';
import Appointment from './Appointment';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.getTimeslots();
  }

  getTimeslots() {
    this.setState({ isLoading: true });

    fetch('https://nrg-frontend-task-api.herokuapp.com/timeslots')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(response => this.setState({ appointments: response, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { error, isLoading, appointments } = this.state;


    if (error) {
      return (<div>{error.message}</div>);
    }

    if (isLoading) {
      return (<div className="datePicker">loading ...</div>);
    }

    return (
      <div className="datePicker">
        {
          appointments.map(appointment => (
            <Appointment key={appointment.date} appointment={appointment} />
          ))
        }
      </div>
    );
  }
}

export default DatePicker;
