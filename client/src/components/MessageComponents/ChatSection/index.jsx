// hooks
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  setThirdSectionOfPage,
  setChatHistory
  // editChatHistory
} from "../../../redux/slices/messages/messagesSlice";
// import socket from "../../../services/socket";
import Pusher from "pusher-js";

// hocs
import messagesResponsive from "../../../hocs/messageResponsive";

// components
import message from "../../../../assets/Icons/Message.svg";
import HeaderDesktop from "../HeaderDesktop";
import MessageList from "../MessageList";

// utils
import { CHAT_SETIONS } from "../utils/chatSetions";

// style
import styles from "./chat.module.sass";
import { useEffect } from "react";
import useServices from "../../../services/useServices";
// import useServices from "../../../services/useServices";
// import { edit, editChatHistory } from "../../../redux/slices/messages/messagesSlice";

function ChatSection() {
  // const currentUser = useSelector(state => state.message.currentUser);
  const { userInfo } = useSelector(state => state.user);
  const selectUser = useSelector(state => state.message.selectUser);
  const { currentChat, currentUser } = useSelector(state => state.message);
  const { chat } = useServices();

  const isTablet = useMediaQuery({
    query: "(min-width: 778px)"
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_key, {
      cluster: import.meta.env.VITE_cluster,
      encrypted: true
    });
    // RECIBIR
    const channel = pusher.subscribe(currentChat.room);

    channel.bind("message", async () => {
      const { data } = await chat.getChathistory(currentUser._id);
      dispatch(setChatHistory(data));
    });

    return () => {
      pusher.unsubscribe(currentChat.room);
    };

    // socket.emit("joinRoom", currentChat.room, message => {
    //   console.log("Unido a la sala " + message);
    // });

    // console.log("ME CONECTOOOOOOOOOOOOOO");

    // return () => {
    //   socket.emit("leaveRoom", currentChat.room, message => {
    //     console.log("Dejo la sala " + message);
    //   });
    // };

    // SE ENVIA POR ROUTA
  }, []);

  // console.log("Me renderizo");

  useEffect(() => {
    // socket.on("receiveMessage", async message => {
    //   const { data } = await chat.getChathistory(currentUser._id);
    //   console.log(data);
    //   dispatch(setChatHistory(data));
    // });
    // return () => {
    //   socket.off("receiveMessage");
    // };
  }, []);

  const handledPage = () => {
    if (!isTablet) {
      navigate("/messages/defaultMessages");
    }
    dispatch(setThirdSectionOfPage(CHAT_SETIONS.predefinedMessages));
  };

  const title = "Selecciona un amigo para chatear";
  const selectMessage = "Selecciona un mensaje";
  return (
    <div className={styles.container}>
      <HeaderDesktop showUserImage={false} showArrow={false} isTitleCenter={true} title={title} />
      <div className={styles.messageContainer}>
        {selectUser ? <MessageList /> : <img src={message} alt="Mensaje" />}
      </div>
      {selectUser && (
        <button className={styles.selectMessage} onClick={handledPage}>
          {selectMessage}
        </button>
      )}
    </div>
  );
}

export default messagesResponsive(ChatSection);
