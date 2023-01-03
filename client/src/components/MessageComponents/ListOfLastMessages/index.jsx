// libraries
import PropTypes from "prop-types";

// hooks
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setFirstSectionOfPage,
  setCurrentUser
} from "../../../redux/slices/messages/messagesSlice";

// styles
import styles from "./latestTextMessageList.module.sass";
import avatarI from "../../../../assets/AccountAvatars/avatar0.svg";

// utils
import { CHAT_SETIONS } from "../utils/chatSetions";

export default function ListOfLastMessages({ messageList }) {
  const isTablet = useMediaQuery({ query: "(min-width: 778px)" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handledPage = data => {
    if (!isTablet) {
      navigate(`/messages/options`);
    }
    dispatch(setFirstSectionOfPage(CHAT_SETIONS.userOptions));
    dispatch(setCurrentUser(data));
  };

  return (
    <div className={styles.container}>
      {messageList.map(({ avatar, username, message, showMessage, userId, ...props }, i) => {
        return (
          <div
            className={styles.link}
            key={i}
            onClick={() =>
              handledPage({ avatar, username, message, showMessage, userId, ...props })
            }>
            <div className={styles.friend}>
              <img className={styles.FriendImage} src={avatar || avatarI} alt="friends" />
              {showMessage && <div className={styles.showMessage} />}

              <div className={styles.messageWraper}>
                <p className={styles.name}>{username}</p>
                <p className={styles.message}>{message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

ListOfLastMessages.propTypes = {
  messageList: PropTypes.array,
  handledMessage: PropTypes.func
};
