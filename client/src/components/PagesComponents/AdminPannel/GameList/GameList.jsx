import classes from "./gameList.module.sass";
import GameItem from "../GameItems/GameItem";
import { Link } from "react-router-dom";
import Cross from "../../../../../assets/Icons/cross.svg";
import SpinnerLoad from "../../SpinnerLoad/SpinnerLoad.jsx";
import useServices from "../../../../services/useServices";
import useGames from "../hooks/useGames";

function GameList() {
  const { games, loadGames, setLoadGames } = useGames();
  const { games: gameList } = useServices();

  const onDelete = async id => {
    // eslint-disable-next-line no-use-before-define
    const confirmDelete = confirm("Esta a punto de borrar este juego");
    if (confirmDelete) {
      const newGames = [...games];
      newGames.splice(id, 1);
      try {
        await gameList.remove(id);
        setLoadGames(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={classes.listgames}>
      <Link
        to="/admin/game-manage"
        className={`${classes.addGameButton} ${classes.border_gradient_radius}`}>
        <span>Agregar Juego</span>
        <span>
          <img src={Cross} />
        </span>
      </Link>
      <div className={classes.listgames_list}>
        <div className={classes.listgames_header}>
          <div>Imágen</div>
          <div>Nombre del Juego</div>
          <div className={classes.description}>Descripción</div>
          <div className={classes.devices}>Apto para</div>
          <div>Editar</div>
        </div>
        {loadGames ? (
          <SpinnerLoad />
        ) : !games ? (
          <p>No hay juegos</p>
        ) : (
          games.map(({ _id, cover, name, description, audiencies, devices }, index) => {
            return (
              <GameItem
                key={index}
                id={_id}
                path={cover.path}
                name={name}
                description={description}
                tags={[audiencies, ...devices]}
                onDelete={onDelete}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default GameList;
