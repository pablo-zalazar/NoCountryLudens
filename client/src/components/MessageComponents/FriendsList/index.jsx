// styles
import styles from "./friendsList.module.sass";
import "keen-slider/keen-slider.min.css";

// libraries
import PropTypes from "prop-types";
import { useKeenSlider } from "keen-slider/react";

// hooks
import { useDispatch, useSelector } from "react-redux";
import {
  setFirstSectionOfPage,
  setCurrentUser,
  setChatHistory
} from "../../../redux/slices/messages/messagesSlice";
import { useMediaQuery } from "react-responsive";

// utils
import { CHAT_SETIONS } from "../utils/chatSetions";
import { useNavigate } from "react-router-dom";
import avatarI from "../../../../assets/AccountAvatars/avatar0.svg";
import useServices from "../../../services/useServices";

export default function FriendsList({ friendsList }) {
  const dispatch = useDispatch();

  const [sliderRef] = useKeenSlider({
    slides: { perView: 3, spacing: 8 }
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 778px)"
  });
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.user);
  const { chat } = useServices();

  const handledPage = async user => {
    if (!isTablet) {
      navigate("/messages/options");
    }
    dispatch(setCurrentUser(user));
    dispatch(setFirstSectionOfPage(CHAT_SETIONS.userOptions));
    if (userInfo.friends.includes(user._id)) {
      const { data } = await chat.getChathistory(user._id);
      dispatch(setChatHistory(data));
    }
  };
  return (
    <div className={styles.container}>
      <div ref={sliderRef} className="keen-slider">
        {friendsList.map(({ avatar, username, _id, ...props }) => (
          <div
            className={`keen-slider__slide ${styles.slide}`}
            key={_id}
            onClick={() => handledPage({ avatar, username, _id, props })}>
            <img src={avatar || avatarI} alt="friends" />
            <p>{username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

FriendsList.propTypes = {
  friendsList: PropTypes.array
};
