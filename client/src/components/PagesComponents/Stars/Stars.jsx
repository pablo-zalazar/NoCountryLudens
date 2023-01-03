import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import style from "./stars.module.sass";
import useServices from "../../../services/useServices";

const Rate = ({ count, color, change, stars, gameId }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const { games } = useServices();
  const [userReview, setUserReview] = useState(0);

  useEffect(() => {
    if (change) {
      if (gameId) {
        (async () => {
          const { data } = await games.getReview(gameId);
          console.log(data.review.length);
          if (data.review.length > 0) setUserReview(data.review[0].stars);
        })();
      }
    }
  }, [gameId]);

  const getColor = index => {
    if (hoverRating >= index) {
      return color.filled;
    }
    if (change) {
      if (!hoverRating && userReview >= index) return color.filled;
    } else if (!hoverRating && stars >= index) return color.filled;

    return color.unfilled;
  };

  const handleChange = async amount => {
    const formData = new FormData();
    formData.append("review", amount);

    try {
      await games.setReview(gameId, { review: amount });
      setUserReview(amount);
    } catch (error) {
      console.log(error);
    }
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map(idx => (
        <i
          className={`bi bi-star-fill ${style.star_icon}`}
          key={idx}
          style={{ color: getColor(idx) }}
          onClick={() => change && handleChange(idx)}
          onMouseEnter={() => change && setHoverRating(idx)}
          onMouseLeave={() => change && setHoverRating(0)}
        ></i>
      ));
  }, [count, stars, hoverRating, userReview]);

  return <div>{starRating}</div>;
};

Rate.propTypes = {
  count: PropTypes.number.isRequired,
  stars: PropTypes.number,
  change: PropTypes.bool.isRequired,
  gameId: PropTypes.string,
  // rating: PropTypes.number.isRequired,
  // onChange: PropTypes.func,
  color: PropTypes.shape({
    filled: PropTypes.string,
    unfilled: PropTypes.string
  })
  // onRating: PropTypes.func
};

Rate.defaultProps = {
  count: 5,
  stars: 0,
  change: false,
  gameId: "",
  color: {
    filled: "#f5eb3b",
    unfilled: "#000"
  }
};

export default Rate;
