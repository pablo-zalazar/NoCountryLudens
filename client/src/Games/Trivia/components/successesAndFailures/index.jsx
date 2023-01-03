import PropTypes from "prop-types";

import sussessIcon from "../../../../Games/Trivia/assets/iconCorrect.svg";
import failIcon from "../../../../Games/Trivia/assets/iconFail.svg";

import styles from "./successesAndFailures.module.sass";

export default function SuccessesAndFailures({ success = 0, failures = 0 }) {
  return (
    <div className={styles.container}>
      <div className={styles.successContainer}>
        <img src={sussessIcon} alt="success" />
        <p>{success}</p>
      </div>
      <div className={styles.failuresContainer}>
        <img src={failIcon} alt="failures" />
        <p>{failures}</p>
      </div>
    </div>
  );
}

SuccessesAndFailures.propTypes = {
  success: PropTypes.number,
  failures: PropTypes.number
};
