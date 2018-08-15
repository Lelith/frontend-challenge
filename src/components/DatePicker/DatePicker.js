import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Appointment from './Appointment';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: null,
      isLoading: true,
      error: null,
      activeDate: -1,
    };

    this.toggleActiveDate = this.toggleActiveDate.bind(this);
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

  toggleActiveDate(event) {
    const appointmentIndex = event.target.value;
    this.setState({
      activeDate: appointmentIndex,
    });
  }

  render() {
    const {
      error,
      isLoading,
      appointments,
    } = this.state;

    const { chooseTime } = this.props;
    const { activeDate } = this.state;

    if (error) {
      return (<div>{error.message}</div>);
    }

    if (isLoading) {
      return (<div className="datePicker">loading ...</div>);
    }

    return (

      <div className="datePicker">
        {
          appointments.map((appointment, index) => {
            const active = parseInt(index, 10) === parseInt(activeDate, 10);
            return (
              <Appointment
                key={appointment.date}
                toggleActiveDate={this.toggleActiveDate}
                chooseTime={chooseTime}
                appointment={appointment}
                appointmentIndex={index}
                active={active}
              />
            );
          })
        }
      </div>
    );
  }
}

DatePicker.propTypes = {
  chooseTime: PropTypes.func.isRequired,
};

export default DatePicker;
