// libraries
import PropTypes from "prop-types";

// components
import arrow from "../../../../assets/Icons/arrow.svg";
// styles
import styles from "./defaultMessageHeader.module.sass";

export default function DefaultMessagesHeader({ handledPage, title = "", className }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <img className={styles.arrow} src={arrow} alt="arrow" onClick={handledPage} />
      <div className={`${styles.title} ${styles.center}`}>
        <p>{title}</p>
      </div>
    </div>
  );
}

DefaultMessagesHeader.propTypes = {
  title: PropTypes.string,
  handledPage: PropTypes.func,
  className: PropTypes.string
};
