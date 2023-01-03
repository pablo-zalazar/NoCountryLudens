import style from "./notifications.module.sass";
// import avatar from "../../../assets/AccountAvatars/avatar4.png";
// import avatar from "../../../assets/AccountAvatars/avatar4.svg";
// import chess from "../../../assets/Imagescards/chess.svg";
// import english from "../../../assets/Imagescards/english.svg";
// import logoM from "../../../assets/Icons/logoHeaderM.svg";
// import Card from "../../components/PagesComponents/Card/Card";
import noSigned from "../../../assets/Icons/noSignNotif.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useServices from "../../services/useServices";
import FriendsNotification from "../../components/NotificationsComponents/FriendsNotification";
import { getUserLogged } from "../../redux/slices/user/userAction";
import SpinnerLoad from "../../components/PagesComponents/SpinnerLoad/SpinnerLoad";

// import { useSelector } from "react-redux";
// import NotificationCard from "../../components/PagesComponents/NotificationCard/NotificationCard";

// const data = [
//   {
//     mode: "challenge",
//     avatar: "../../../assets/AccountAvatars/avatar4.svg",
//     name: "Carlos",
//     imgUrl: "../../../assets/Imagescards/chess.svg",
//     nameGame: "Aprende Ajedrez"
//   },
//   {
//     mode: "friend",
//     avatar: "../../../assets/AccountAvatars/avatar2.svg",
//     name: "Ana"
//   },
//   {
//     mode: "challengeAc",
//     avatar: "../../../assets/AccountAvatars/avatar6.svg",
//     name: "Carlos"
//   },
//   {
//     mode: "news",
//     imgUrl: "../../../assets/Imagescards/english.svg",
//     nameGame: "Aprende Inglés",
//     message: "Aprende inglés con nuestro nuevo juego"
//   }
// ];

const Notifications = () => {
  const dispatch = useDispatch();
  const [myNotifications, setMyNotifications] = useState([]);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);

  const { userLogged } = useSelector(state => state.auth);
  const { notifications, friends } = useServices();

  useEffect(() => {
    if (userLogged) {
      (async () => {
        const { data } = await notifications.getNotifications();
        console.log("result", data);
        setMyNotifications(data.notifications);
        setIsNotificationsLoading(false);
      })();
    } else {
      setIsNotificationsLoading(false);
    }
  }, []);

  const acceptInvitation = async notificationId => {
    const { data } = await friends.getFriendRequest(notificationId);
    await friends.acceptInvitation(data.emmiterId);
    const newNotifications = await notifications.deleteNotification(notificationId);
    setMyNotifications(newNotifications.data);
    dispatch(getUserLogged(userLogged.id));
  };

  const refuseInvitation = async notificationId => {
    const { data } = await friends.getFriendRequest(notificationId);
    await friends.refuseInvitation(data.emmiterId);
    const newNotifications = await notifications.deleteNotification(notificationId);
    setMyNotifications(newNotifications.data);
  };

  return (
    <div className={style.notif_content}>
      {/* Logueado */}
      {isNotificationsLoading ? (
        <SpinnerLoad className={style.spinner} />
      ) : (
        <>
          {userLogged ? (
            myNotifications[0] ? (
              myNotifications.map(not => (
                <FriendsNotification
                  key={not._id}
                  data={not}
                  accept={acceptInvitation}
                  refuse={refuseInvitation}
                />
              ))
            ) : (
              <div className={style.not_logged}>
                <img src={noSigned} alt="" />
                <h3>No hay notificaciones</h3>
              </div>
            )
          ) : (
            <div className={style.not_logged}>
              <img src={noSigned} alt="" />
              <h3>Inicia sesión para ver las notificaciones</h3>
              <Link to="/login">
                <button>Iniciar sesión</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;
