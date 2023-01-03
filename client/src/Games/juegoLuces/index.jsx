import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useServices from "../../services/useServices";
import Modal from "./Modal/Modal";
import style from "./tablero.module.sass";
import PropTypes from "prop-types";

const setBoard = () => {
  const board = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];
  board.forEach((fila, i) => {
    fila.forEach((columna, j) => {
      board[i][j] = Math.floor(Math.random() * 3) === 2;
    });
  });
  return board;
};

const LightGame = ({ setScores, gameId }) => {
  const [lights, setLights] = useState(setBoard());
  const [play, setPlay] = useState(false);
  const [score, setScore] = useState("0");
  const [time, setTime] = useState(0);
  const { scores } = useServices();
  const { userLogged } = useSelector(state => state.auth);

  useEffect(() => {
    if (play) {
      setTimeout(() => {
        const win = !lights.map(row => row.every(e => e === true)).includes(false);
        if (win) {
          finishGame();
          setLights(setBoard());
        }
      }, 200);
    }
  }, [lights]);

  useEffect(() => {
    let interval = null;
    if (play === true) {
      interval = setInterval(() => {
        setTime(time => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [play]);

  const finishGame = async () => {
    setPlay(false);
    const gameScore = 3600 - Math.floor(time / 1000);
    const newScore = gameScore > 1 ? gameScore.toString() : 1;
    setScore(newScore);
    if (userLogged) {
      await scores.createInGame(gameId, { score: newScore });
      setScores(newScore);
    }
  };

  const startGame = () => {
    if (score === "0") {
      setPlay(true);
    } else {
      setTime(0);
      setLights(setBoard());
      setScore("0");
      setPlay(true);
    }
  };

  const handleClick = (row, column) => {
    const newBoard = lights.map(a => a);
    newBoard[row][column] = !newBoard[row][column];

    if (row !== 0 && row - 1 >= 0) newBoard[row - 1][column] = !newBoard[row - 1][column];
    if (row !== newBoard.length && row + 1 < newBoard.length)
      newBoard[row + 1][column] = !newBoard[row + 1][column];

    if (column !== 0 && column - 1 >= 0) newBoard[row][column - 1] = !newBoard[row][column - 1];

    if (column !== newBoard[0].length && column + 1 < newBoard[0].length)
      newBoard[row][column + 1] = !newBoard[row][column + 1];

    setLights(newBoard);
  };

  return (
    <div className={style.container}>
      <div className={style.board}>
        {play && (
          <>
            <div className={style.timer}>
              <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            </div>
            {lights.map((row, i) =>
              row.map((column, j) => (
                <button
                  key={`${i}${j}`}
                  className={`${style.light} ${column ? style.on : style.off}`}
                  onClick={() => handleClick(i, j)}
                />
              ))
            )}
          </>
        )}
        {!play && <Modal play={play} startGame={startGame} score={score} />}
      </div>
    </div>
  );
};

LightGame.propTypes = {
  setScores: PropTypes.func,
  gameId: PropTypes.string
};

export default LightGame;
