import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';

import DatePicker from '../DatePicker/DatePicker';
import { Button, Switch } from '../FormElements';
import IconLeft from '../../img/icon_arrow_left.svg';
import 'react-phone-number-input/style.css';

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
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.chooseTime = this.chooseTime.bind(this);
    this.readFormValue = this.readFormValue.bind(this);
    this.readPhone = this.readPhone.bind(this);
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
      }
    }
  }

  handleCheckbox() {
    const { getCall, isValid } = this.state;
    this.setState({
      getCall: !getCall,
      isValid: !isValid,
    });
  }

  chooseTime(event) {
    const { target } = event;
    const value = target.value.split(',');

    this.setState({
      date: value[0],
      slot: value[1],
    });

    this.validateForm();
  }

  readFormValue(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    this.validateForm();
  }

  // the phone input component only returns the number instead of the whole event

  readPhone(number) {
    this.setState({
      phone: number,
    });
    this.validateForm();
  }

  sendForm() {
    // send all form fields via post and then redirect to success page
    const { isValid } = this.state;
    if (isValid) {
      /* fetch('https://nrg-frontend-task-api.herokuapp.com/appointments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        }),
      }); */
      console.log('sending form');
      this.setState({ redirect: true });
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
        <fieldset>
          <div className="form__actions">
            <span className="form__label">Would you like to shedule a call with your Stylist before they pack your box?</span>
            <Switch onChange={this.handleCheckbox} />
          </div>
          {getCall && (
          <fieldset>
            <PhoneInput
              country="DE"
              name="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={this.readPhone}
              className="form__element"
            />
            <DatePicker chooseTime={this.chooseTime} />
          </fieldset>
          )}
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
        </fieldset>
      </form>
    );
  }
}

export default ConfirmationForm;
