// libraries
import PropTypes from "prop-types";

// components
import arrow from "../../../../assets/Icons/arrow.svg";
import user from "../assets/friend-1.svg";

// styles
import styles from "./header.module.sass";

export default function HeaderDesktop({
  userImage = user,
  showArrow = true,
  showUserImage = true,
  isTitleCenter = false,
  handledPage,
  title = ""
}) {
  return (
    <div className={styles.container}>
      {showArrow && <img className={styles.arrow} src={arrow} alt="arrow" onClick={handledPage} />}
      <div className={`${styles.title} ${isTitleCenter ? styles.center : styles.left}`}>
        {showUserImage && <img className={styles.friend} src={userImage} alt="Image friend" />}
        <p>{title}</p>
      </div>
    </div>
  );
}

HeaderDesktop.propTypes = {
  title: PropTypes.string,
  userImage: PropTypes.string,
  showArrow: PropTypes.bool,
  showUserImage: PropTypes.bool,
  isTitleCenter: PropTypes.bool,
  handledPage: PropTypes.func
};
