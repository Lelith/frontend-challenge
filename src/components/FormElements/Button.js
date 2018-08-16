import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import SVG from 'react-inlinesvg';

require('./Button.css');

const Button = (props) => {
  const {
    as,
    label,
    disabled,
    onClick,
    kind,
    className,
    icon,
    type,
    ...other
  } = props;

  const ButtonType = (type && type !== Button.defaultProps.type) ? type : Button.defaultProps.type;

  const ElementType = (as && as !== Button.defaultProps.as) ? as : Button.defaultProps.as;

  const classes = classNames(
    'button',
    `button--${kind}`,
    className,
  );
  return (
    <ElementType
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={ButtonType}
      {...other}
    >
      {icon
        && <i className="button__icon"><SVG src={icon} /></i>
      }
      {label
        && <span className="button__label"> {label} </span>
      }
    </ElementType>
  );
};

Button.propTypes = {
  as: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  kind: PropTypes.oneOf(['primary', 'icon']),
  icon: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

Button.defaultProps = {
  label: undefined,
  as: 'button',
  kind: 'primary',
  type: 'button',
  icon: undefined,
  disabled: false,
  onClick: () => {},
  className: '',
};

export default Button;
