// libraries
import PropTypes from "prop-types";

// styles
import styles from "./messageList.module.sass";

import { useSelector, useDispatch } from "react-redux";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { setChannel } from "../../../redux/slices/messages/messagesSlice";
import useServices from "../../../services/useServices";

export default function MessageList() {
  const { userLogged } = useSelector(state => state.auth);
  const { currentChat } = useSelector(state => state.message);
  const { chat } = useServices();

  // useEffect(() => {
  // socket.emit("joinRoom", currentChat.room, message => {
  //   console.log("Unido a la sala " + message);
  // });

  // console.log("ME CONECTOOOOOOOOOOOOOO");

  // return () => {
  //   socket.emit("leaveRoom", currentChat.room, message => {
  //     console.log("Dejo la sala " + message);
  //   });
  // };

  // }, []);

  return (
    <div className={styles.container}>
      {currentChat?.messages.map(({ id, message, icon }, index) => (
        <div
          key={index}
          className={`${styles.text} ${
            id !== userLogged.id ? styles.ownMessage : styles.defaultMessage
          }`}>
          <p className={icon ? styles.icon : styles.text}>{message}</p>
        </div>
      ))}
    </div>
  );
}

MessageList.propTypes = {
  messajeList: PropTypes.array,
  ownId: PropTypes.string,
  chat: PropTypes.array
};
