// Styles and Images
import style from "./allGames.module.sass";
import { todopublico, plus3, plus7, mouse, gamepad, keyboard, touch } from "../../../assets";

// React Libraries
import PropTypes from "prop-types";
import { useState, lazy, Suspense, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Rate from "../../components/PagesComponents/Stars/Stars";
import SpinnerLoad from "../../components/PagesComponents/SpinnerLoad/SpinnerLoad";
import FavoriteButton from "../../components/PagesComponents/FavoriteButton/FavoriteButton";

// Services
import useServices from "../../services/useServices";

const AllGames = () => {
  // Getting params of game Id to load game data
  const { id } = useParams();
  // Getting services
  const { games, scores } = useServices();
  // Constants
  const [state, setState] = useState(false);
  // Getting Redux states
  const { userLogged } = useSelector(state => state.auth);
  const { userInfo } = useSelector(state => state.user);
  // Lazy loading of the game based on the id and folder of the game
  const MyGame = lazy(() => import(`../../Games/${state.folder}/index.jsx`)); // Lazy Load of Games

  useEffect(() => {
    // Load game and scores. Saving data on state
    (async () => {
      try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        const resultGame = await games.getById(id);
        // eslint-disable-next-line testing-library/no-await-sync-query
        const resultScore = await scores.getByGame(id);
        setState({ ...resultGame.data.game, scores: resultScore.data.scores });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // Update scores
  const setScores = useCallback(
    score => {
      let newScores = state.scores.filter(score => score.username !== userInfo.username);
      if (newScores.length === state.scores.length)
        newScores.push({ username: userInfo.username, name: state.name, score });
      else {
        newScores = state.scores.map(elem =>
          elem.username !== userInfo.username
            ? elem
            : elem.score > score
            ? elem
            : { username: elem.username, name: elem.name, score }
        );
      }
      const sortedScores = newScores.sort((p1, p2) =>
        p1.score < p2.score ? 1 : p1.score > p2.score ? -1 : 0
      );
      setState({ ...state, scores: sortedScores });
    },
    [userInfo, state]
  );

  return (
    <div className={style.games_content}>
      {state ? (
        <>
          <div className={style.name}>
            <h2>{state.name}</h2>
            <Rate change={false} stars={state.stars} />
          </div>
          <div className={style.desktop}>
            <div className={style.screen_games}>
              <Suspense fallback={<SpinnerLoad />}>
                <MyGame />
                <MyGame setScores={setScores} gameId={state._id} />
              </Suspense>
            </div>
            <div>
              <div className={style.text_start}>
                <h3>Descripción:</h3>
                <p>{state.description}</p>
                <div className={style.d_flex}>
                  {state.minAge === "tp" && <img src={todopublico} alt="" />}
                  {state.minAge === "+3" && <img src={plus3} alt="" />}
                  {state.minAge === "+7" && <img src={plus7} alt="" />}
                  {state.devices.map(d =>
                    d === "mouse" ? (
                      <img key={d} src={mouse} />
                    ) : d === "gamepad" ? (
                      <img key={d} src={gamepad} />
                    ) : d === "keyboard" ? (
                      <img key={d} src={keyboard} />
                    ) : d === "touch" ? (
                      <img key={d} src={touch} />
                    ) : null
                  )}
                </div>
              </div>
              <div className={style.ranking}>
                <div>
                  <h4>Nombre</h4>
                  <h4>Puntuación</h4>
                </div>
                {state.scores.lenght > 0 ? (
                  state.scores.map((score, i) => (
                    <div key={i}>
                      <p>{score.username}</p>
                      <p>{score.score}</p>
                    </div>
                  ))
                ) : (
                  <div className={style.noranking}>
                    Aún no hay puntajes en este juego, juéga y sé el primero de la lista!
                  </div>
                )}
              </div>
              {userLogged && (
                <>
                  <FavoriteButton favoriteId={state._id} />
                  <div className={style.qualify}>
                    <h4>Califica el juego</h4>
                    <Rate change={true} gameId={state._id} />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <SpinnerLoad className={style.spinner} />
      )}
    </div>
  );
};

AllGames.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  minAge: PropTypes.number,
  stars: PropTypes.number,
  folder: PropTypes.string
};

export default AllGames;
