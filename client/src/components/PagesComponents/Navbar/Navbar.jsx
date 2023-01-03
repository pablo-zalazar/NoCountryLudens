import style from "./navbar.module.sass";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/Icons/logo1.svg";

export const Navbar = () => {
  return (
    <div className={style.nav_content}>
      <NavLink to="/" className={style.logo}>
        <img src={logo} />
      </NavLink>
      <div className={style.nav}>
        <NavLink to="/">
          {({ isActive }) => (
            <img className={`${style.img} ${isActive ? style.gamesAc : style.games}`} />
          )}
        </NavLink>
      </div>
      <div className={style.nav}>
        <NavLink to="/favourites">
          {({ isActive }) => (
            <img className={`${style.img} ${isActive ? style.favsAc : style.favs}`} />
          )}
        </NavLink>
      </div>
      <div className={style.nav}>
        <NavLink to="/messages">
          {({ isActive }) => (
            <img className={`${style.img} ${isActive ? style.messagesAc : style.messages}`} />
          )}
        </NavLink>
      </div>
      <div className={style.nav}>
        <NavLink to="/notifications">
          {({ isActive }) => (
            <img className={`${style.img} ${isActive ? style.notifAc : style.notif}`} />
          )}
        </NavLink>
      </div>
    </div>
  );
};
