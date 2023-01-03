import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./toast.module.sass";

export default function Toast({ content, style, showToast = true, timeout = 5000 }) {
  const [isShow, setIsShow] = useState(showToast);

  useEffect(() => {
    setIsShow(showToast);
    setTimeout(() => {
      setIsShow(false);
    }, timeout);
  }, [timeout, showToast]);

  return (
    <div>
      {isShow && (
        <div className={styles.container} style={style}>
          <div className={styles.content}>{content}</div>
        </div>
      )}
    </div>
  );
}

Toast.propTypes = {
  content: PropTypes.string,
  style: PropTypes.object,
  showToast: PropTypes.bool,
  timeout: PropTypes.number
};
