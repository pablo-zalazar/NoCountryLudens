import { useEffect, useState } from "react";
import style from "./header.module.sass";
import logo from "../../../../assets/Icons/logoHeader.svg";
import logoM from "../../../../assets/Icons/logoHeaderM.svg";
import search from "../../../../assets/Icons/search.svg";
import user from "../../../../assets/Icons/usersquare.svg";
import arrow from "../../../../assets/Icons/arrow.svg";
import { Link, useLocation } from "react-router-dom";
// Como obtener datos de redux
import { useSelector, useDispatch } from "react-redux"; // Importar use Selector
import { logout } from "../../../redux/slices/auth";
import { resetUser } from "../../../redux/slices/user";
import { getUserLogged } from "../../../redux/slices/user/userAction";
import { changeFilter } from "../../../redux/slices/filter";
import Titles from "./Titles";
import arrowD from "../../../../assets/Icons/arrowMenuD.svg";
import arrowU from "../../../../assets/Icons/arrowMenuU.svg";
import avatar from "../../../../assets/AccountAvatars/avatar0.svg";

const Header = () => {
  const [searchM, setSearchM] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { userInfo } = useSelector(state => state.user); // Obtenemos lo que contiene userinfo desde el slice user. (hay user y auth)
  const { userLogged } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // User tiene userInfo con todos los datos del usuario completos.
  // Auth solo tiene si esta logueado o no: en userLogged tiene el id, el rol, y en userToken tiene el token.

  const { filter } = useSelector(state => state.filter);
  const location = useLocation();

  const inputM = () => {
    setSearchM(!searchM);
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetUser());
  };

  const handleMenu = () => setUserMenu(!userMenu);

  useEffect(() => {
    setUserMenu(false);
  }, [location]);

  useEffect(() => {
    if (!userInfo && userLogged) {
      dispatch(getUserLogged(userLogged.id));
    }
  }, [userInfo]);

  const handleChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  const { home, headerTitle } = Titles();

  return (
    <div className={style.header_content}>
      {home && !searchM && (
        <>
          <div className={style.spacer}></div>
          <img className={style.logoHM} src={logo} />
        </>
      )}
      {home && searchM && <img className={style.mob} src={arrow} onClick={inputM} />}
      {home && searchM && <img className={style.logoHM} src={logoM} />}
      {home && searchM && (
        <input className={style.inputM} type="text" value={filter} onChange={handleChange} />
      )}
      <img className={style.logoH} src={logo} />
      {home && (
        <input
          className={style.inputD}
          type="text"
          placeholder="Ej Matemáticas, Memoria..."
          value={filter}
          onChange={handleChange}
        />
      )}
      {!home && (
        <Link to="/" className={style.mob}>
          <img src={arrow} />
        </Link>
      )}
      {!home && <h2 className={style.title}>{headerTitle}</h2>}
      {home && !searchM && <img className={style.mob} src={search} onClick={inputM} />}
      {!userLogged && (
        <Link to="/login" className={style.mob}>
          <img src={user} />
        </Link>
      )}
      {!userLogged && (
        <Link to="/login" className={style.login1}>
          Iniciar sesión
        </Link>
      )}
      {userLogged && (
        <div className={style.user_container} onClick={handleMenu}>
          <div className={style.user}>
            {!userMenu && <img className={style.arrow} src={arrowD} />}
            {userMenu && <img className={style.arrow} src={arrowU} />}
            <img src={userInfo.avatar || avatar} />
          </div>
          {userMenu && (
            <ul className={style.menu}>
              <li>
                <Link to="/account">
                  <p>Perfil</p>
                </Link>
              </li>
              {userLogged?.role === "admin" && (
                <li>
                  <Link to="/admin">
                    <p>Panel Admin</p>
                  </Link>
                </li>
              )}
              <li onClick={logoutHandler}>
                <Link to="/">
                  <p>Cerrar sesión</p>
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
