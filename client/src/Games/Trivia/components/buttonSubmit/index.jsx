import PropTypes from "prop-types";

// styles
import styles from "./buttonSubmit.module.sass";

export default function ButtonSubmit({ show = true }) {
  const NEXT_BUTTON = "Next";
  return (
    <button
      className={styles.button}
      style={{ background: show ? "#7281A9" : "#0A39B1" }}
      type="submit"
      disabled={show}
    >
      {NEXT_BUTTON}
    </button>
  );
}

ButtonSubmit.propTypes = {
  value: PropTypes.string,
  show: PropTypes.bool
};
