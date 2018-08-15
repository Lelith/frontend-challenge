import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import SVG from 'react-inlinesvg';
import IconCheck from '../../img/icon_check.svg';

require('./Switch.css');

class Switch extends Component {
  constructor(props) {
    super(props);

    const { checked } = props;

    this.state = {
      checked,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
  }

  render() {
    const {
      className,
      disabled,
      label,
      id,
      name,
      value,
      type,
      ...other
    } = this.props;

    const { checked } = this.state;

    const switchClasses = classNames(
      'switch',
      { 'switch--checked': checked },
      className,
    );

    return (
      <label
        className={switchClasses}
        htmlFor={id}
        label={label}
      >
        <input
          type={type}
          className="switch__input"
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          onClick={this.handleClick}
          hidden
          {...other}
        />
        <span className="switch__slider">
          <SVG src={IconCheck} className="switch__slider__icon" />
        </span>
      </label>
    );
  }
}

Switch.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

Switch.defaultProps = {
  id: 'switch',
  name: 'switch',
  value: 'switch',
  label: '',
  type: 'checkbox',
  className: '',
  onChange: () => {},
  disabled: false,
  checked: false,
};

export default Switch;
