import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DatePicker from '../DatePicker/DatePicker';
import { Button } from '../FormElements';
import IconLeft from '../../img/arrow-left.svg';

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
    const { getCall, isValid, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/success" />;
    }

    return (
      <form className="confirmationForm">
        <fieldset>
          Would you like to receive a call?
          <input type="checkbox" onChange={this.handleCheckbox} />

          {getCall && (
            <DatePicker chooseTime={this.chooseTime} />
          )}
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
        </fieldset>
      </form>
    );
  }
}

export default ConfirmationForm;
