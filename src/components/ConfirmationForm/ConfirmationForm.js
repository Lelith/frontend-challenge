import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';

import DatePicker from '../DatePicker/DatePicker';
import { Button, Switch } from '../FormElements';
import IconLeft from '../../img/icon_arrow_left.svg';
import Stylist from '../../img/Stylist.png';
import 'react-phone-number-input/style.css';

require('./ConfirmationForm.css');

class ConfirmationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      getCall: false,
      date: null,
      slot: null,
      phone: null,
      redirect: false,
      orderConfirmationComment: '',
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.writeFormValue = this.writeFormValue.bind(this);
    this.chooseTime = this.chooseTime.bind(this);
    this.readPhone = this.readPhone.bind(this);
    this.readField = this.readField.bind(this);
  }

  validateForm() {
    const {
      getCall,
      date,
      slot,
      phone,
    } = this.state;

    if (getCall) {
      if (phone != null && date != null && slot != null) {
        this.setState({ isValid: true });
      } else {
        this.setState({ isValid: false });
      }
    } else {
      this.setState({
        phone: null,
        slot: null,
        date: null,
        isValid: true,
      });
    }
  }

  handleCheckbox() {
    const { getCall } = this.state;
    this.writeFormValue('getCall', !getCall);
  }

  // the phone input component only returns the number instead of the whole event
  readPhone(number) {
    this.writeFormValue('phone', number);
  }

  // timeslot and date are two different fields
  chooseTime(event) {
    const { target } = event;
    const value = target.value.split(',');
    this.writeFormValue('date', value[0]);
    this.writeFormValue('slot', value[1]);
  }

  readField(event) {
    const { target } = event;
    this.writeFormValue(target.name, target.value);
  }

  writeFormValue(name, value) {
    this.setState({
      [name]: value,
    }, () => {
      this.validateForm();
    });
  }

  sendForm() {
    // send all form fields via post and then redirect to success page
    const {
      isValid,
      phone,
      date,
      slot,
      orderConfirmationComment,
    } = this.state;

    if (isValid) {
      const opts = {
        date,
        slot,
        orderConfirmationComment,
        phone,
      };

      fetch('https://nrg-frontend-task-api.herokuapp.com/appointments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opts),
      })
        .then(response => (
          response.json()
        ))
        .then(() => (
          this.setState({ redirect: true })
        ));
    }
  }

  render() {
    const {
      getCall,
      isValid,
      redirect,
      phone,
    } = this.state;

    if (redirect) {
      return <Redirect to="/success" />;
    }

    return (
      <form className="confirmationForm form">
        <div className="form__actions">
          <img className="form__img" src={Stylist} alt="your stylist" />
          <span className="form__label">Would you like to shedule a call with your Stylist before they pack your box?</span>
          <Switch onChange={this.handleCheckbox} />
        </div>
        {getCall && (
        <div>
          <div className="form__element form__element--highlight">
            <span className="form__text">Schedule a call with your Stylist at a time to suit you, to talk about your order, style and preferencfes</span>
            <h3 className="form__label">Contact telephone number</h3>
            <PhoneInput
              country="DE"
              name="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={this.readPhone}
            />
          </div>
          <DatePicker chooseTime={this.chooseTime} />
        </div>
        )}
        <div className="form__element form__element--highlight">
          <label>
            <span className="form__text">Is there anything else you would like to share with your Stylist?</span>
            <textarea name="orderConfirmationComment" onChange={this.readField} />
          </label>
        </div>
        <div className="form__actions">
          <Button
            as="a"
            href="/"
            kind="icon"
            title="back"
            icon={IconLeft}
          />
          <Button
            onClick={this.sendForm}
            disabled={!isValid}
            label="Confirm"
          />
        </div>
      </form>
    );
  }
}

export default ConfirmationForm;
