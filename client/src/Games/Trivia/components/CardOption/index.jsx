import PropTypes from "prop-types";

// styles
import styles from "./cardOption.module.sass";

export default function CardOption({ optionValue, style, ...props }) {
  return (
    <label className={styles.container} style={style}>
      <input className={styles.checkbox} type="checkbox" name="checkbox" {...props} />
      {optionValue}
    </label>
  );
}

CardOption.propTypes = {
  optionValue: PropTypes.string,
  props: PropTypes.object,
  style: PropTypes.object
};
