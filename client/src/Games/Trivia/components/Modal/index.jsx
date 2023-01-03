import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./modal.module.sass";

export default function Modal({ showModal = false, title, playAgain, content }) {
  const EXIT_BUTTON = "Salir";
  const PLAY_AGAIN_BUTTON = "Jugar de nuevo";
  return (
    <div>
      {showModal && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.title}>
              <p>{title}</p>
            </div>
            <div className={styles.content}>
              <p>{content}</p>
            </div>
            <div className={styles.footer}>
              <Link to="/" className={styles.button}>
                {EXIT_BUTTON}
              </Link>
              <button className={styles.button} onClick={playAgain}>
                {PLAY_AGAIN_BUTTON}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Modal.propTypes = {
  showModal: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  playAgain: PropTypes.func
};
