import classes from "./errorValidation.module.sass";
import { PropTypes } from "prop-types";
import { info } from "../../../../assets";

function ErrorValidation({ className, message }) {
  return (
    <div className={`${classes.error} ${className}`}>
      <img src={info} alt="Error de validación" />
      <p>{message}</p>
    </div>
  );
}

export default ErrorValidation;

ErrorValidation.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string
};
