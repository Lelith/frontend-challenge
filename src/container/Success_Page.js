import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import Stylist from '../img/Stylist.png';
import IconWallet from '../img/icon_wallet.svg';
import IconMoney from '../img/icon_money.svg';
import IconHouse from '../img/icon_house.svg';

require('./Success_Page.css');

class SuccessPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      appointmentData: null,
    };
  }

  componentDidMount() {
    this.getAppointmentData();
  }

  getAppointmentData() {
    this.setState({ isLoading: true });
    fetch('https://nrg-frontend-task-api.herokuapp.com/appointments')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(response => this.setState({ appointmentData: response.pop(), isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const {
      error,
      isLoading,
      appointmentData,
    } = this.state;

    if (error) {
      return (<div className="pageContent">{error.message}</div>);
    }


    if (!isLoading && appointmentData != null) {
      const {
        stylist,
        date,
        slot,
      } = appointmentData;

      let SuccessText = `Thank you very much ${stylist} will now start putting together your OUTFITTERY BOX`;

      if (date != null) {
        const formattedDate = new Date(date).toLocaleDateString('de-De');
        const formattedTime = new Date(`${date} ${slot}`).toLocaleTimeString('de-De', {
          hour: '2-digit',
          minute: '2-digit',
        });

        SuccessText = `Thank you very much! You have a call booked with ${stylist} on the ${formattedDate} at ${formattedTime}`;
      }

      return (
        <div className="pageContent">
          <div className="success__message">
            <img className="success__image" src={Stylist} alt="your stylist" />
            <span className="success__text">
              {SuccessText}
            </span>
          </div>
          <div className="success__details">
            <span className="success__details__header">Your order details</span>
            <div className="success__details__entry">
              <SVG className="success__details__icon" src={IconWallet} />
              <div className="success__details__text">
                <h4 className="success__details__headline">Payment Method: Mastercard</h4>
                <p>  **** **** *** 45</p>
              </div>
            </div>
            <div className="success__details__entry">
              <SVG className="success__details__icon" src={IconHouse} />
              <div className="success__details__text">
                <h4 className="success__details__headline">Delivery Address</h4>
                  Max Mustermann <br />
                  Schönste Straße 3 <br />
                  00000 Berlin
              </div>
            </div>
            <div className="success__details__entry">
              <SVG className="success__details__icon" src={IconMoney} />
              <div className="success__details__text">
                <h4 className="success__details__headline">Billing Address</h4>
                <p>
                  Max Mustermann <br />
                  Schönste Straße 3 <br />
                  00000 Berlin
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (<div className="pageContent">loading ...</div>);
  }
}


export default SuccessPage;
