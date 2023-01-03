import PropTypes from "prop-types";
import { useState } from "react";

// assets
import arrow from "../../../../Games/Trivia/assets/arrowBottom.svg";

// styles
import styles from "./showAnswer.module.sass";

export default function ShowAnswer({ answer = "" }) {
  const [show, setShow] = useState(false);

  const handledShow = () => {
    setShow(!show);
  };

  const SHOW_ANSWER = "Mostrar Respuesta";

  return (
    <div className={styles.container}>
      <label onClick={handledShow}>
        <p>{SHOW_ANSWER}</p>
        <img src={arrow} alt="Show answer" />
      </label>
      {show && <p>{answer}</p>}
    </div>
  );
}

ShowAnswer.propTypes = {
  answer: PropTypes.string
};
