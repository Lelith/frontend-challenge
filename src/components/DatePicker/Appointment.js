import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };

    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    const { active } = this.state;
    this.setState({
      active: !active,
    });
  }

  render() {
    const { appointment } = this.props;
    const { active } = this.state;
    const availableSlots = appointment.slots.length;
    const appointmentClasses = classNames(
      'appointment',
      { 'appointment--disabled': availableSlots === 0 },
    );

    return (
      <div className={appointmentClasses}>
        <span role="presentation" onClick={availableSlots > 0 && this.toggleActive}>
          {appointment.date}
        </span>
        {active && availableSlots > 0 && (
          <ul className="availableSlots">
            {appointment.slots.map(time => (
              <li key={time.start}>
                <label>
                  <input type="checkbox" value={time.start} />
                  {time.start} to {time.end}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Appointment.propTypes = {
  appointment: PropTypes.object,
};

Appointment.defaultProps = {
  appointment: {},
};
export default Appointment;
