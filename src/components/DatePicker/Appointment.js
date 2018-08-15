import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';

const Appointment = (props) => {
  const {
    appointment,
    chooseTime,
    toggleActiveDate,
    appointmentIndex,
  } = props;
  const { active } = props;
  const availableSlots = appointment.slots.length;

  const appointmentClasses = classNames(
    'appointment',
    { 'appointment--disabled': availableSlots === 0 },
  );

  return (
    <div className={appointmentClasses}>
      <label>
        <input type="radio" name="date" onChange={availableSlots > 0 ? toggleActiveDate : undefined} value={appointmentIndex} />
        {appointment.date}
      </label>
      {active && availableSlots > 0 && (
        <ul className="availableSlots">
          {appointment.slots.map(time => (
            <li key={time.start}>
              <label>
                <input type="radio" name="time" value={`${appointment.date}, ${time.start}`} onChange={chooseTime} />
                {time.start} to {time.end}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Appointment.propTypes = {
  appointment: PropTypes.object,
  active: PropTypes.bool,
  toggleActiveDate: PropTypes.func.isRequired,
  chooseTime: PropTypes.func.isRequired,
  appointmentIndex: PropTypes.number.isRequired,
};

Appointment.defaultProps = {
  appointment: {},
  active: false,
};
export default Appointment;
