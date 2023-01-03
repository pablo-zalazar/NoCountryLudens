import { useEffect, useState } from "react";
import style from "./favoriteButton.module.sass";

import like from "../../../../assets/Icons/favFill.svg";
import fav from "../../../../assets/Icons/favM.svg";
import { getUserLogged } from "../../../redux/slices/user/userAction";
import useServices from "../../../services/useServices";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import SpinnerLoad from "../SpinnerLoad/SpinnerLoad.jsx";

const FavoriteButton = ({ favoriteId }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites } = useServices();
  const { userLogged } = useSelector(state => state.auth);
  const { userInfo } = useSelector(state => state.user);
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await favorites.addRemoveFavorite(favoriteId);
    dispatch(getUserLogged(userLogged.id));
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.favorites.includes(favoriteId)) setIsFavorite(true);
      else setIsFavorite(false);
    }
    setLoading(false);
  }, [userInfo, favoriteId]);

  return (
    <div className={style.d_flex}>
      {isLoading ? (
        <SpinnerLoad className={style.spinner} />
      ) : !isFavorite ? (
        <img src={fav} alt="Corazón Vacio" onClick={handleClick} />
      ) : (
        <img src={like} alt="Corazón lleno" onClick={handleClick} />
      )}
      <p>{!isFavorite ? "Agregar a Favoritos" : "Eliminar de Favoritos"} </p>
    </div>
  );
};

export default FavoriteButton;

FavoriteButton.propTypes = {
  favoriteId: PropTypes.number
};
