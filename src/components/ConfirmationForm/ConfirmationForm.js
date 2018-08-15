import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DatePicker from '../DatePicker/DatePicker';

class ConfirmationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      getCall: false,
      redirect: false,
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  handleCheckbox() {
    const { getCall, isValid } = this.state;
    this.setState({
      getCall: !getCall,
      isValid: !isValid,
    });
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
          Would you like to receive a call? <input type="checkbox" onChange={this.handleCheckbox} />

          {getCall && (
            <DatePicker />
          )}
          <button className="button primary" onClick={this.sendForm} type="button" disabled={!isValid}>Confirm</button>
        </fieldset>
      </form>
    );
  }
}

export default ConfirmationForm;
