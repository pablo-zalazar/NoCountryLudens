import classes from "./SpinnerLoad.module.sass";
import PropTypes from "prop-types";

export default function SpinnerLoad({ className }) {
  return (
    <div className={`${classes.container} ${className}`}>
      <div className={classes.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

SpinnerLoad.propTypes = {
  className: PropTypes.string
};
