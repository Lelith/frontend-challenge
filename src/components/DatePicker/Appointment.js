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
    { 'appointment--active': active },
    { 'appointment--disabled': availableSlots === 0 },
  );
  const formattedDate = new Date(appointment.date).toLocaleDateString('de-De');

  return (
    <div className={appointmentClasses}>
      <label className="appointment__date">
        <input hidden type="radio" name="date" onChange={availableSlots > 0 ? toggleActiveDate : undefined} value={appointmentIndex} />
        {formattedDate}
      </label>
      {active && availableSlots > 0 && (
        <ul className="appointment__availableSlots">
          {appointment.slots.map(time => (
            <li className="appointment__time" key={time.start}>
              <label>
                <input className="styledRadio" type="radio" name="time" value={`${appointment.date},${time.start}`} onChange={chooseTime} />
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
