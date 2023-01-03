import PropTypes from "prop-types";
// assets
import alarm from "../../../../Games/Trivia/assets/alarm.svg";
// styles
import styles from "./Trivia.module.sass";

export default function Progress({ minutes, seconds, percentaje }) {
  return (
    <div className={styles.containerProgressBar}>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${percentaje}%` }}>
          <span className={styles.timer}>{`${minutes}:${seconds}`}</span>
        </div>
        <div className={styles.alarmContainer}>
          <img src={alarm} alt="Progress alarm" className={styles.alarmIcon} />
        </div>
      </div>
    </div>
  );
}

Progress.propTypes = {
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  percentaje: PropTypes.number
};
