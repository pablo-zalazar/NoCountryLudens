// libraries
import { useMediaQuery } from "react-responsive";

// components
import MobileMessagePage from "../../components/MessageComponents/MobileMessagePage";
import DesktopMessagePage from "../../components/MessageComponents/DesktopMessagePage";

// styles
import classes from "./messages.module.sass";

// no logueado
import noSigned from "../../../assets/Icons/noSignMessages.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CHAT_SETIONS } from "../../components/MessageComponents/utils/chatSetions";
import {
  setFirstSectionOfPage,
  resetCurrentUser,
  setSelectUser,
  setThirdSectionOfPage
} from "../../redux/slices/messages/messagesSlice";

const Messages = () => {
  const { userLogged } = useSelector(state => state.auth);
  const [isLogged] = useState(userLogged);
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({
    query: "(min-width: 778px)"
  });

  useEffect(() => {
    return () => {
      dispatch(setFirstSectionOfPage(CHAT_SETIONS.searchFriends));
      dispatch(setThirdSectionOfPage(null));
      dispatch(resetCurrentUser());
      dispatch(setSelectUser(false));
    };
  }, []);

  return (
    <div className={classes.messages_content}>
      {/* Logueado */}
      {isLogged && (isTablet ? <DesktopMessagePage /> : <MobileMessagePage />)}
      {/* No logueado */}
      {!isLogged && (
        <div className={classes.not_logged}>
          <img src={noSigned} alt="" />
          <h3>Inicia sesión para ver los mensajes</h3>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Messages;
