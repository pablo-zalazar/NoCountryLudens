import { useEffect } from "react";
import PropTypes from "prop-types";
// components
import CardOption from "../CardOption";
import ButtonSubmit from "../buttonSubmit";
import ShowAnswer from "../showAnswer";
import Toast from "../Toast";
import SuccessesAndFailures from "../successesAndFailures";
import Progress from "../ProgressBar/Progress";
import Modal from "../Modal";

// styles
import styles from "./optionContainer.module.sass";

// utils
import { ACTIONS } from "../../triviaUtils/constants/actionsReducer";
import { QUESTIONS } from "../../triviaUtils/constants/triviaquestions";

// hooks
import useChronometer from "../../hooks/useChronometer";
import useGameState from "../../hooks/useGameState";

const FAILD_COLOR = "#FF1E1E";
const SUCCES_COLOR = "#4ECB71";

const YOU_LOST = "Perdistes";
const YOU_WIN = "Ganastes";

export default function OptionsContainer({ questionsNumber }) {
  const {
    questionNumberCurrent,
    isSelectAnswer,
    successNumber,
    faildNumber,
    toasText,
    showModal,
    dispatch
  } = useGameState();

  const { minutes, seconds, percentaje, time, setTime, setCronometro } = useChronometer({
    fullTimer: 10000
  });

  const {
    question: questionCurrent,
    options: optionsCurrent,
    answer
  } = QUESTIONS[questionNumberCurrent];

  useEffect(() => {
    const endOfTime = time === 10000;
    if (endOfTime) {
      dispatch({ type: ACTIONS.YOU_LOST });
    }
  }, [time, questionNumberCurrent]);

  const handledGameReset = () => {
    setCronometro(true);
    setTime(0);
    dispatch({ type: ACTIONS.RESET_GAME });
  };

  const handledAnwer = e => {
    const gameOver = questionNumberCurrent === 2;
    const correctAnswer = e === answer;
    dispatch({ type: ACTIONS.SELECT_ANSWER });
    setCronometro(false);
    if (correctAnswer) {
      dispatch({ type: ACTIONS.YOU_WIND });
    } else {
      dispatch({ type: ACTIONS.YOU_LOST });
    }
    if (gameOver) {
      const toastMessage = faildNumber > successNumber ? YOU_LOST : YOU_WIN;
      dispatch({ type: ACTIONS.GAME_OVER, payload: toastMessage });
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    dispatch({ type: ACTIONS.NEXT_QUESTION });
    setTime(0);
    setCronometro(true);
  };
  return (
    <div className={styles.container}>
      <Progress minutes={minutes} seconds={seconds} percentaje={percentaje} />
      <SuccessesAndFailures success={successNumber} failures={faildNumber} />
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.containerOfQuestionAndOptions}>
          <div className={styles.questionNumber}>{`Pregunta ${
            questionNumberCurrent + 1
          }/${questionsNumber}`}</div>
          <div className={styles.question}>{questionCurrent}</div>
          <div className={styles.cardsOptionsContainer}>
            {optionsCurrent.map(opt => {
              return (
                <CardOption
                  key={opt}
                  style={{
                    border: `solid 1px ${
                      isSelectAnswer && (opt === answer ? SUCCES_COLOR : FAILD_COLOR)
                    }`
                  }}
                  optionValue={opt}
                  value={opt}
                  disabled={isSelectAnswer}
                  onClick={() => handledAnwer(opt)}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.containerOfButtonAndAnswer}>
          {isSelectAnswer && <ShowAnswer answer={answer} />}
          <ButtonSubmit show={!isSelectAnswer} />
        </div>
      </form>
      <Toast
        content={toasText}
        style={{ background: `${toasText === YOU_LOST ? FAILD_COLOR : SUCCES_COLOR}` }}
        showToast={isSelectAnswer}
      />
      <Modal
        content={toasText}
        showModal={showModal}
        title="Juego terminado"
        playAgain={handledGameReset}
      />
    </div>
  );
}

OptionsContainer.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  questionsNumber: PropTypes.number
};
